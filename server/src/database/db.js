import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Atlas Connected!");
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error}`);
  }
};

export default connectDatabase;
