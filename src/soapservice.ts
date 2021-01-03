import {setup as aiSetup} from "applicationinsights"
import express = require("express")
import fs = require("fs")
import * as soap from "soap"
import type {IMessageSplitterInput,IMessageSplitterOutput} from "./MessageSplitterService/MessageSplitterServiceSoapPort"
import * as t11adventureworks from "./t11adventureworks"
import type {IQueryProductsInput,IQueryProductsOutput} from "./SalesLTService/SalesLTServiceSoapPort"
// import type {Express} from "express"
// const app: Express = express()
interface IMessageSplitterServiceSoapPort extends soap.IServicePort {
    MessageSplitter: soap.ISoapServiceMethod,
}
interface IMessageSplitterService extends soap.IService {
    MessageSplitterServiceSoapPort: IMessageSplitterServiceSoapPort,
}
interface IAllMyServicesFromWSDL extends soap.IServices {
    MessageSplitterService: IMessageSplitterService,
}

if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY) aiSetup().setAutoCollectConsole(true, true).setSendLiveMetrics(true).start()
const app: express.Express = express()

const splitter_function: soap.ISoapServiceMethod = async (args:IMessageSplitterInput):Promise<IMessageSplitterOutput> => {
    if(!args.message || args.message.length < 3) {
        console.error("splitter_function:ERROR:Log message is empty or too short", JSON.stringify(args))
        throw Error("splitter_function:Log message is empty or too short")
    } else console.log('splitter_function:request:',JSON.stringify(args))
    const splitted_msg:string[] = args.message.split(args.splitter)
    let result = []
    for(let i = 0; i < splitted_msg.length; i++) result.push(splitted_msg[i])
    const res:IMessageSplitterOutput = {result,version:"V738"}
    console.log('splitter_function:response:',JSON.stringify(res))
    return res
}
const messageSplitterServiceObject:IAllMyServicesFromWSDL = {
    MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: splitter_function
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: splitter_function
        }
      }
  }

const QueryProducts: soap.ISoapServiceMethod = async (args:IQueryProductsInput):Promise<IQueryProductsOutput> => {
    try {
        console.log("QueryProducts:request",JSON.stringify(args))
        const r = await t11adventureworks.queryTop10Products("QueryProducts",args.fields,args.filter)
        const res:IQueryProductsOutput = {product:r,version:"617." + r.length}
        console.log('QueryProducts:response:',JSON.stringify(res))
        return res
    }catch(error){
        console.log('QueryProducts:error:',JSON.stringify(error))
        throw error
    }
}

const messageSplitterWsdl = fs.readFileSync("service.wsdl", "utf8")
const salesLTWsdl = fs.readFileSync("saleslt.wsdl", "utf8")
app.get("/",(req,res) => {
    res.send("Message Splitter & AdventureWorks SOAP Services V01032013, use serviceUrl/messagesplitter?wsdl or /saleslt?wsdl to get full WSDL")
})
let port: number = parseInt(process.env.PORT || "8000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 8000
app.listen(port,() => {
    soap.listen(app, "/messagesplitter", messageSplitterServiceObject, messageSplitterWsdl)
    soap.listen(app, "/saleslt", {SalesLTService:{SalesLTServiceSoapPort:{QueryProducts}}}, salesLTWsdl)
    console.log(`Open http://localhost:${port}/messagesplitter?wsdl or http://localhost:${port}/saleslt?wsdl in a browser to test`)
})
