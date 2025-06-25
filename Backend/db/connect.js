import mongoose from "mongoose";

let connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDb Connected to ${conn.connection.name} at ${conn.connection.host} : ${conn.connection.port}`
    );
  } catch (error) {
    console.log(`MongoDb Connection Failed : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
