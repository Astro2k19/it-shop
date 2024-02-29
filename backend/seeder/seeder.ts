import mongoose from "mongoose";
import Product from "../model/Product";
import data from './data'
import {config} from "dotenv";

config({
    path: './backend/config/config.env'
})

const seederProducts = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_DATABASE_URI)
        await Product.deleteMany()
        await Product.insertMany(data)
    } catch (error) {
        console.log(error, 'error')
    }
}

seederProducts()
