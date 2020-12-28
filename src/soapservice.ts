import {setup as aiSetup} from "applicationinsights"
import express = require("express")
import fs = require("fs")
import {listen as soapListen, Server as SoapServer, IServices,ISoapServiceMethod, IService,IServicePort} from "soap"
///*import*/const soap = require("soap")
import * as soap from "soap"
import type {IMessageSplitterInput,IMessageSplitterOutput} from "./MessageSplitterService/MessageSplitterServiceSoapPort"
// import type {Express} from "express"
// const app: Express = express()
interface IMessageSplitterServiceSoapPort extends IServicePort {
    MessageSplitter: ISoapServiceMethod,
}
interface IMessageSplitterService extends IService {
    MessageSplitterServiceSoapPort: IMessageSplitterServiceSoapPort,
}
interface IAllMyServicesFromWSDL extends IServices {
    MessageSplitterService: IMessageSplitterService,
}

if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY) aiSetup().setAutoCollectConsole(true, true).setAutoDependencyCorrelation(true).start()
const app: express.Express = express()

const splitter_function: ISoapServiceMethod = (args:IMessageSplitterInput):IMessageSplitterOutput => {
    if(!args.message || args.message.length < 3) {
        console.error("ERROR:splitter_function:Log message is empty or too short")
        throw Error("splitter_function:Log message is empty or too short")
    } else console.log('INFO:splitter_function:request:',JSON.stringify(args))
    const splitted_msg:string[] = args.message.split(args.splitter)
    let result = []
    for(let i = 0; i < splitted_msg.length; i++) result.push(splitted_msg[i])
    const res:IMessageSplitterOutput = {result,version:"V738"}
    console.log('INFO:splitter_function:response:',JSON.stringify(res))
    return res
}

const serviceObject:IAllMyServicesFromWSDL = {
    MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: splitter_function
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: splitter_function
        }
      }
  }
const xml = fs.readFileSync("service.wsdl", "utf8")
app.get("/",(req,res) => {
    res.send("Message Splitter SOAP Service, use serviceUrl/wsdl?wsdl to get full WSDL and use serviceUrl/wsdl to post SOAP request envelops")
})
let port: number = parseInt(process.env.PORT || "8000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 8000
app.listen(port,() => {
    /*const soapServer: SoapServer =*/ soapListen(app, "/wsdl", serviceObject, xml)
    soap.listen(app, "/wsdl", serviceObject, xml)
    console.log(`Open http://localhost:${port}/wsdl?wsdl in a browser to test`)
})
