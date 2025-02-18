import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected:", connect.connection.host);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};
