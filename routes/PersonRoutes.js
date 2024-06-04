const express = require("express");
const app = express();
const port = 3000;

const router = express.Router();

const person = require("./../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log("Data saved", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid work type" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id;
    const updatePersonId = req.body;

    const response = await person.findByIdAndUpdate(personID, updatePersonId, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid work type" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id;

    const response = await person.findByIdAndDelete(personID);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid work type" });
  }
});

module.exports = router;
