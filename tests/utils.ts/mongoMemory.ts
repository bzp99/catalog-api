import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
let mongoServer: MongoMemoryServer;
export const openMongoMemory = async () => {
  console.log("\x1b[93m> Mongoose Memory Connection...\x1b[0m");
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  await mongoose.connection.db.dropDatabase();
  console.log("\x1b[93m\t- Connected.\x1b[0m");
};

export const closeMongoMemory = async () => {
  await mongoose.disconnect();
  await mongoServer.stop({ force: true });
};
