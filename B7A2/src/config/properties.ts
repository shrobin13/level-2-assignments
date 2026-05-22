import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const properties = {
  port: process.env.PORT,
  connectionString: process.env.DB_CONNECTION_STRING,
};

export default properties;
