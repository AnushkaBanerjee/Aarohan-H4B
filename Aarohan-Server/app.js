import express from "express"
import cors from "cors"


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


// Server Status
import serverStatusRouter from "./src/routes/serverStatus.routes.js"
app.use("/",serverStatusRouter);



export { app }