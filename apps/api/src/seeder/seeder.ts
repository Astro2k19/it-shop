import mongoose from 'mongoose';
import ProductModel from '../model/Product';
import data from './data';

const seederProducts = async () => {
    try {
        console.log(process.env.DATABASE_URI, 'process.env.DATABASE_URI');
        await mongoose.connect(process.env.DATABASE_URI);
        // await ProductModel.deleteMany();
        // await ReviewModel.deleteMany();
        await ProductModel.insertMany(data);
    } catch (error) {
        console.log(error, 'error');
    }
};

seederProducts();
