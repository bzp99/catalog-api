import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
let mongoServer: MongoMemoryServer;
export const openMongoMemory = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log("\x1b[93m> Mongoose Memory Connected\x1b[0m");
};

export const closeMongoMemory = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
