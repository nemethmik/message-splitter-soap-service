import express from "express"
// import type {Express} from "express"
// const app: Express = express()
const app: express.Express = express()
app.get("/",(req,res) => {
    res.send("Hello from Node SOAP Service V826!")
})
let port: number = parseInt(process.env.PORT || "8000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 8000
app.listen(port,()=>{
    console.log(`Open http://localhost:${port}/ in a browser to test`)
})