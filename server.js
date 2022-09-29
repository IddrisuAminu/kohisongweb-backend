const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
 const connectDB = require("./config/connectDB");
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/usersRoute");
const cors = require("cors");
const { connect } = require("mongoose");



dotenv.config()
// connection
connectDB()
// middlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/efamp/api/v1/items", itemsRoute);
app.use("/efamp/api/v1/users", usersRoute);

//home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to KOHISONG FARMS MARKET PLACE</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
