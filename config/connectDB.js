const mongoose = require("mongoose");

// const connectDB = async () => {
//      await mongoose.createConnection(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   console.log("Database has been connected");
// };
// module.exports = connectDB;


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      //must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongo database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};

module.exports = connectDB;