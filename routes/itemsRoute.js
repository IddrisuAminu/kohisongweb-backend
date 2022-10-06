const express = require("express");
const {
  getSingleItem,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/ItemsController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getAllItems).post(protect, createItem);
router
  .route("/:_id")
  .get(protect, getSingleItem)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;
