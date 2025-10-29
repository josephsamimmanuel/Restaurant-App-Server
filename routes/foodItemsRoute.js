const express = require("express");
const foodItemsRouter = express.Router();
const FoodItem = require("../models/foodItemModel");
const auth = require("../middleware/auth");

// Add Food Item
foodItemsRouter.post("/add", auth, async (req, res) => {
    try {
        const { name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image } = req.body;
        const foodItem = await FoodItem.create({ name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image });
        res.status(201).json({ message: "Food item added successfully", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Food Items
foodItemsRouter.get("/all", auth, async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json({ message: "Food items fetched successfully", foodItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Food Item by ID
foodItemsRouter.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const foodItem = await FoodItem.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ message: "Food item fetched successfully", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Food Item
foodItemsRouter.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image } = req.body;
        const foodItem = await FoodItem.findByIdAndUpdate(id, { name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image }, { new: true });
        res.status(200).json({ message: "Food item updated successfully", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Food Item
foodItemsRouter.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        await FoodItem.findByIdAndDelete(id);
        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = foodItemsRouter;