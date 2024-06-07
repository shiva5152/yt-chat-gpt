import mongoose from "mongoose";

const connection = {
    isConnected: false
};

const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URL || "");
        if (db.connections[0].readyState) connection.isConnected = true;
    } catch (error) {
        const e = error as any;
        console.log(error);
        throw new Error(e);
    }
};

export default connectToDb;