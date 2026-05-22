import app from "./app";
import properties from "./config/properties";
import { initDb } from "./db/init";

const PORT = properties.port;

const main = () => {
  initDb();

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

main();
