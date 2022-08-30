const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });

    console.log(`MongoDG Connected: ${conn.connection.name}`);

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;

