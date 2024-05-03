import mongoose from "mongoose";
import { CONFIG } from "./environment";

export async function loadMongoose() {
  let mongoUri = `mongodb://${CONFIG.mongoHost}:${CONFIG.mongoPort}/${CONFIG.mongoDatabase}`;

  if (CONFIG.mongoUserName && CONFIG.mongoPassword) {
    mongoUri = `mongodb://${CONFIG.mongoUserName}:${CONFIG.mongoPassword}@${CONFIG.mongoHost}:${CONFIG.mongoPort}/${CONFIG.mongoDatabase}`;
  }

  const connect = await mongoose.connect(mongoUri);
  const connection = connect.connection;
  connection.on(
    "error",
    // eslint-disable-next-line
    console.error.bind(console, "MongoDB connection error: ")
  );

  return connection;
}

export async function closeMongoose() {
  await mongoose.disconnect();
}
