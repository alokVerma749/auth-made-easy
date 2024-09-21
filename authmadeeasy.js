import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const DEFAULT_PORT = process.env.PORT || 8000;

export default async function authmadeeasy({
  db_uri = process.env.DB_URI,
  db_name = process.env.DB_NAME,
  port = DEFAULT_PORT,
} = {}) {
  try {
    await connectDB({ db_uri, db_name });

    app.listen(port, () => {
      console.log(`Server is up and running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server or connect to the database:", error);
  }
}
