const db = require("./db");
const person = require("./models/Person");
const menuItem = require("./models/Menu");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());


//import router
const personRoute = require('./routes/PersonRoutes');

app.use('/person',personRoute);


app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const menuItem = new menuItem(data);

    const response = await menuItem.save();
    console.log("Data saved", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});







app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
