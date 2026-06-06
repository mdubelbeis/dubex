import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 8000;

const { default: app } = await import("./app.js");

const DB_LOCAL = process.env.DB_LOCAL || "mongodb: //127.0.0.1:27017/<db-name>";
const DB_ClOUD = process.env.DB_CLOUD;

mongoose
  .connect(DB_LOCAL)
  .then(conn => console.log("Successfull Database Connection"))
  .catch(err => console.log("Failed Database Connection: " + err.message));

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
