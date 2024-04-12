import mongoose from 'mongoose';
import Product from '../model/Product';
import data from './data';

const seederProducts = async () => {
    try {
        console.log(process.env.DATABASE_URI, 'process.env.DATABASE_URI');
        await mongoose.connect(process.env.DATABASE_URI);
        await Product.deleteMany();
        await Product.insertMany(data);
    } catch (error) {
        console.log(error, 'error');
    }
};

seederProducts();
