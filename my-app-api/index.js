// using mongoDB atles

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const uri =
  "mongodb+srv://sureshmadhushanka11:1996@cluster0.mhtqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

// Define the schema and model
const itemSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  age: Number,
});

const Item = mongoose.model("Item", itemSchema); // use itemSchema as model for all items

// READ (GET) - Get all items
app.get("/item", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send("Error fetching items");
  }
});

// READ (GET) - Get a single item by ID
app.get("/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("Item not found");
    res.json(item);
  } catch (error) {
    res.status(500).send("Error fetching item");
  }
});

// CREATE (POST) - Add a new item
app.post("/item", async (req, res) => {
  // make new object of item for dynamic data
  const newItem = new Item({
    fname: req.body.fname,
    lname: req.body.lname,
    age: req.body.age,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send("Error saving item");
  }
});

// UPDATE (PUT) - Update an item by ID
app.put("/item/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { fname: req.body.fname },
      { new: true }
    );

    if (!updatedItem) return res.status(404).send("Item not found");
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send("Error updating item");
  }
});

// DELETE (DELETE) - Remove an item by ID
app.delete("/item/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).send("Item not found");
    res.json(deletedItem);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting item");
  }
});

app.listen(port, () => {
  console.log(`CRUD app listening on port ${port}`);
});

// const express = require("express");
// const app = express();
// const port = 3001;

// app.get("/id", (req, res) => {
//   res.send("Hello World!");
// });

// const express = require("express");
// const cors = require("cors"); // cors import
// const app = express(); // app is refer as express
// const port = 3002;
// app.use(cors()); // tell app to use cors

// app.use(express.json()); // Middleware to parse JSON request bodies

// Sample data storage
// let profile = [
//   { id: 1, fname: "Malith", vehicles: ["car", "van"] },
//   { id: 2, fname: "Kanishka", vehicles: "car" },
// ];

// READ (GET) - Get all items
// app.get("/profile", (req, res) => {
//   console.log("run");
//   res.json(profile);
// });

// // // READ (GET) - Get a single item by ID
// app.get("/profile/:id", (req, res) => {
//   // ":" denoted path variable
//   const item = profile.find((i) => i.id === parseInt(req.params.id)); // find loop
//   if (!item) return res.status(404).send("Item not found");
//   res.json(item);
// });

// // // CREATE (POST) - Add a new item
// app.post("/profile", (req, res) => {
//   const newItem = {
//     id: profile.length + 1,
//     fname: req.body.fname,
//     vehicles: req.body.vehicles,
//   };
//   profile.push(newItem);
//   res.status(201).json(newItem);
// });

// // UPDATE (PUT) - Update an item by ID
// app.put("/profile/:id", (req, res) => {
//   const item = profile.find((i) => i.id === parseInt(req.params.id));
//   if (!item) return res.status(404).send("Item not found");

//   item.fname = req.body.fname;
//   res.json(item);
// });

// // // DELETE (DELETE) - Remove an item by ID
// app.delete("/profile/:id", (req, res) => {
//   const itemIndex = profile.findIndex((i) => i.id === parseInt(req.params.id));
//   if (itemIndex === -1) return res.status(404).send("Item not found");

//   const deletedItem = profile.splice(itemIndex, 1);
//   res.json(deletedItem);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
