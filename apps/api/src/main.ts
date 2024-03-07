import express from "express";
import productsRouter from './routes/products'
import {connectDatabase} from "./config/connectDatabase";
import errorMiddleware from "./shared/middlewares/errorMiddleware";
import authRouter from "./routes/auth";


const app = express()
connectDatabase()

app.use(express.json())
app.use('/api/v1/', productsRouter)
app.use('/api/v1/', authRouter)

app.use(errorMiddleware)
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

process.on('uncaughtException', (err) => {
  console.log(`UncaughtException ERROR: ${err}`)
  process.exit()
})

process.on('unhandledRejection', (err) => {
  console.log(`UnhandledRejection ERROR: ${err}`)
  console.log('Server is shutting down!')
  server.close(() => {
    console.log('Server connection was closed!')
    process.exit()
  })
})
