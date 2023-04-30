const express = require("express");
const app = express();
const { connection } = require("./db")
const { UserRouter } = require("./ROutes/User.routes")
const { Authentication } = require("./Middleware/Authentication")
const {notesROuter} = require("./ROutes/Note.routes")
var jwt = require('jsonwebtoken');
require("dotenv").config();



app.use(express.json());
app.use("/user", UserRouter)

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
})

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
})

app.use(Authentication);

app.use("/Note",notesROuter)

app.listen(process.env.port , async () => {
  try {
    await connection;
    console.log("Server is running at port 8080")

  } catch (error) {
    console.log("something is wrong.server is not connected")
  }
})