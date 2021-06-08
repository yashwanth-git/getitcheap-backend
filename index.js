const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Routes
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");

const app = express();

//Middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Middlewares for Routes
app.use("/items", itemRoutes);
app.use("/users", userRoutes);

//Connect to mongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //To avoid console warnings
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
  )
  .catch((err) => console.log(err));
//To avoid console warnings
mongoose.set("useFindAndModify", false);
