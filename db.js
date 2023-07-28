const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
});

// mongoose.connect(process.env.MONGO_URL);
// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });

// database.once("connected", () => {
//   console.log("Database Connected");
// });

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((data) =>
    console.log(`MongoDB connected with server ${data.connection.host}`)
  )
  .catch((err) => console.log(err));

module.exports = pool;
