import mongoose from "mongoose";
import { config } from "./dotenv.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export { connectDB };