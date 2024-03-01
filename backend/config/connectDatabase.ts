import mongoose from "mongoose";

export const connectDatabase = () => {
    const connectionString =
        process.env.NODE_ENV === 'DEVELOPMENT'
        ? process.env.LOCAL_DATABASE_URI
        : process.env.DATABASE_URI

    mongoose.connect(connectionString).then(value => {
        console.log(`MongoDB database connected to ${value.connection?.host} host`)
    })
}
