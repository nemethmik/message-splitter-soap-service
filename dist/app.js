"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import type {Express} from "express"
// const app: Express = express()
const app = express_1.default();
app.get("/", (req, res) => {
    res.send("Hello from Node SOAP Service V826!");
});
let port = parseInt(process.env.PORT || "8000");
if (isNaN(port) || port <= 0 || port >= 65536)
    port = 8000;
app.listen(port, () => {
    console.log(`Open http://localhost:${port}/ in a browser to test`);
});
