import config from "config";
import connectDB from "./src/db/index.js";
import {app} from './app.js'

const envConfig = config.get('env');
process.env = { ...process.env, ...envConfig };

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Database connection failed !!! ", err);
})