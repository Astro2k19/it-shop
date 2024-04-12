import express from 'express';
import productsRouter from './routes/products';
import { connectDatabase } from './config/connectDatabase';
import errorMiddleware from './shared/middlewares/errorMiddleware';
import authRouter from './routes/auth';
import orderRouter from './routes/order';
import reviewRouter from './routes/review';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
connectDatabase();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/', productsRouter);
app.use('/api/v1/', authRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', reviewRouter);

app.use(errorMiddleware);
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`
    );
});

// console.log(process.env, 'process.env');

process.on('uncaughtException', (err) => {
    console.log(`UncaughtException ERROR: ${err}`);
    process.exit();
});

process.on('unhandledRejection', (err) => {
    console.log(`UnhandledRejection ERROR: ${err}`);
    console.log('Server is shutting down!');
    server.close(() => {
        console.log('Server connection was closed!');
        process.exit();
    });
});
