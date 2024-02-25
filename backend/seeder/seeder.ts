import mongoose from "mongoose";
import Product from "../model/Product";
import data from './data'

const seederProducts = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop-it')
        await Product.deleteMany()
        await Product.insertMany(data)
    } catch (error) {
        console.log(error, 'error')
    }
}

seederProducts()
