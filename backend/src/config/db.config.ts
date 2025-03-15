import mongoose from "mongoose";

const connectDB = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
