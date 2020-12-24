import express from "express"
import fs from "fs"
import {listen as soapListen, Server as SoapServer, IServices,ISoapServiceMethod, IService,IServicePort} from "soap"
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

const app: express.Express = express()

const splitter_function: ISoapServiceMethod = (args:IMessageSplitterInput):IMessageSplitterOutput => {
    console.log('splitter_function')
    const splitted_msg:string[] = args.message.split(args.splitter)
    let result = []
    for(let i = 0; i < splitted_msg.length; i++) result.push(splitted_msg[i])
    return {result,version:"V1049"}
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
    res.send("Message Splitter SOAP Service V1233!")
})
let port: number = parseInt(process.env.PORT || "8000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 8000
app.listen(port,() => {
    /*const soapServer: SoapServer =*/ soapListen(app, "/wsdl", serviceObject, xml)
    console.log(`Open http://localhost:${port}/wsdl?wsdl in a browser to test`)
})
