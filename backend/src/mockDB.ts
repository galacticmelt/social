import { MongoMemoryServer } from "mongodb-memory-server";
import { db } from "./db.js"

let mockDB: MongoMemoryServer;

const connectMockDB = async () => {
  mockDB = await MongoMemoryServer.create()
  const uri = await mockDB.getUri()
  await db.connect(uri)
}

const disconnectMockDB = async () => {
  await db.connection.dropDatabase()
  await db.connection.close()
  await mockDB.stop()
}

export { connectMockDB, disconnectMockDB }

