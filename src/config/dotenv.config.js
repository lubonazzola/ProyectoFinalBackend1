import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://lubonazzola:telefono20@cluster0.m75ff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};
