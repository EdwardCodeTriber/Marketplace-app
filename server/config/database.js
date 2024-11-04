import mongoose from "mongoose";

//MongoDB connection
const connectDB =async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${connection.connection.host}`)
    } catch (error) {
        //Error output for rejected connection
        console.error(`Eror: ${error}`)
    }
};

export default connectDB;