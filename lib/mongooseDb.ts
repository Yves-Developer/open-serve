import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Mongoose: DB Connected!");
  } catch (error) {
    console.log("Failed to connect to Db, Error:", error);
  }
};
