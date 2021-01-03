import mssql = require("mssql")
import appInsights = require("applicationinsights")
import type {SalesLTServiceSoapPortTypes} from "./SalesLTService/SalesLTServiceSoapPort"

const config:mssql.config = {  
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER || "t11adventureworks.database.windows.net",
    database: process.env.DATABASE || "t11adventureworks",
    options: {enableArithAbort:false}, // to handle tedious deprecated The default value for `config.options.enableArithAbort` will change from `false` to `true` in the next major version of `tedious`
}
export async function querySQL(callerContext:string,sql:string):Promise<mssql.IResult<any>> {
    const startTime = Date.now()
    try {
        if(!process.env.USER || !process.env.PASSWORD) throw "No USER or PASSWORD environment variables defined for database login"
        console.log(`${callerContext}:querySQL:`,JSON.stringify(sql))
        const pool = await new mssql.ConnectionPool(config).connect()
        const r = await pool.query(sql)
        const duration = Date.now() - startTime;
        if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
            appInsights.defaultClient.trackDependency({target:config.database, name:callerContext, data:sql, duration, resultCode:0, success: true, dependencyTypeName: "Azure SQL"})
        }
        console.log(`${callerContext}:querySQL:${duration}:result:`,JSON.stringify(r))
        return r
        //return await pool.request().query(sql)
    } catch(error) {
        let errorNumber = -1
        try{errorNumber = error.originalError.info.number}catch(e){}
        const duration = Date.now() - startTime;
        if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
            appInsights.defaultClient.trackDependency({target:config.database, name:callerContext, data:JSON.stringify(error), duration, 
                resultCode:(errorNumber), success: false, dependencyTypeName: "Azure SQL"})
        }
        console.error(`${callerContext}:querySQL:${duration}:error(${errorNumber}):`,JSON.stringify(error))
        throw error
    }
}

// export type TProduct = {
//     ProductID?:string,
//     Name?:string,
// }
export const queryTop10Products = async(callerContext:string,fields:string,filter?:string):Promise<Array<SalesLTServiceSoapPortTypes.Iproduct>> => {
    let s = "SELECT " + fields + " FROM SalesLT.Product" + (filter ? " WHERE " + filter : "")
    const r = await querySQL(callerContext,s)
    return r.recordset as Array<SalesLTServiceSoapPortTypes.Iproduct>
}
