import mongoose from "mongoose";
import config from "../config";

export const dbConnection = async () => {
  const connect = await mongoose.connect(
    process.env.NODE_EVN === "test"
      ? config.databaseUrlTest
      : config.databaseUrl
  );

  console.log(
    `User Exchange database is connected : ${connect.connection.host}`.blue
      .underline.bold
  );
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
};

export const dbRefresh = async () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection is not established.");
  }

  const collections = await db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
};
