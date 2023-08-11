// Author: Sagar Paresh Shah (B00930009)

const mongoose = require("mongoose");
const dbConfig = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.CLUSTER}.${dbConfig.TLD}.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        dbName: dbConfig.DB,
      }
    );

    const connectedDbName = mongoose.connection.name;
    const expectedDbName = dbConfig.DB;

    if (connectedDbName === expectedDbName) {
      console.log(`Connected to the ${expectedDbName} database`);
    } else {
      console.log(`Connected to a different database: ${connectedDbName}`);
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
