import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URI).then(value => {
        console.log(`MongoDB database connected to ${value.connection?.host} host`)
    })
}
