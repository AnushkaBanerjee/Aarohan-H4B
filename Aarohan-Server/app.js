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

// User Endpoints
import userRouter from './src/routes/user.routes.js'
app.use("/api/v1/users", userRouter)

// Class Endpoints
import classRouter from './src/routes/class.routes.js'
app.use("/api/v1/classes", classRouter)

// Chat Endpoints
import chatRouter from './src/routes/chat.routes.js'
app.use("/api/v1/chats", chatRouter)


export { app }