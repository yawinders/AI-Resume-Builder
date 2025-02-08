import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {


        });
        console.log(`MongoDB Connected:${conn.connection.host}`);

    } catch (err) {
        console.log(`Error: ${err.message}`);

    }
}