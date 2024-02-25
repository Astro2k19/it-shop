import express from "express";
import {config} from 'dotenv'
import productsRouter from './routes/products'
import {connectDatabase} from "./config/connectDatabase";

config({
    path: './backend/config/config.env'
})

connectDatabase()

const app = express()

app.use('/api/v1/', productsRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
