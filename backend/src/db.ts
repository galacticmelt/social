import db from 'mongoose'

const connectDB = async () => {
  try {
    return await db.connect(process.env.MONGO_CONNECT!, () => console.log('connected to DB successfully'));
  } catch(e) {
    console.log(e);
  }
}

export { db, connectDB }