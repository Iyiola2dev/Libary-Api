import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import dbConnection from "./db/conn.js";
import userRouter from "./routes/userRouter.js";


dotenv.config()
await dbConnection()

const library = express();
const Port = 3002;
library.use(express.json())
library.use(cors())
library.use("/api/v1/user", userRouter)
// library.use("/api/v1/book", )
// library.use("/api/v1/book", )

library.listen(Port, ()=>{
    console.log(`Server is running on http://localhost:${Port}`);
})

