
import mongoose from "mongoose";


async function connectionMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongo DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
export default  connectionMongoDB 
