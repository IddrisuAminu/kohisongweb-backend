const Item = require("../models/itemSchema");

// adding a new item
const createItem = async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    image: req.body.image,
    category: req.body.cateory,
    description: req.body.description,
    price: req.body.price,
  });

  await newItem.save();
  res.status(201).json(newItem);
};

const getAllItems = async (req, res) => {
  const item = await Item.find();
  res.json(item);
};

//get an item
const getSingleItem = async (req, res) => {
  const item = await Item.findById(req.params._id);
  res.json(item);
};

// update an item
const updateItem = async (req, res) => {
  const foundItem = await Item.findById(req.params._id);
  if (foundItem) {
    (foundItem.name = req.body.name ? req.body.name : foundItem.name),
      (foundItem.image = req.body.image ? req.body.image : foundItem.image),
      (foundItem.category = req.body.category
        ? req.body.category
        : foundItem.category),
      (foundItem.description = req.body.description
        ? req.body.dob
        : foundItem.description),
      (foundItem.price = req.body.price ? req.body.price : foundItem.price);

    const updatedItem = await foundItem.save();
    res.json({ updatedItem });
  }
};

//delete an item
const deleteItem = async (req, res) => {
  const foundItem = await Item.findById(req.params._id);
  if (foundItem) {
    foundItem.remove();
    res.json({ msg: ` ${foundItem.name} removed` });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
};
