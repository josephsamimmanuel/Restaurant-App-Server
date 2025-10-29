const express = require("express");
const masalaItemsRouter = express.Router();
const MasalaItem = require("../models/masalaItemModel");
const auth = require("../middleware/auth");

// Add Masala Item
masalaItemsRouter.post("/add", auth, async (req, res) => {
    try {
        const { name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image } = req.body;
        const masalaItem = await MasalaItem.create({ name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image });
        res.status(201).json({ message: "Masala item added successfully", masalaItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Masala Items
masalaItemsRouter.get("/all", auth, async (req, res) => {
    try {
        const masalaItems = await MasalaItem.find();
        res.status(200).json({ message: "Masala items fetched successfully", masalaItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Masala Item by ID
masalaItemsRouter.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const masalaItem = await MasalaItem.findById(id);
        if (!masalaItem) {
            return res.status(404).json({ message: "Masala item not found" });
        }
        res.status(200).json({ message: "Masala item fetched successfully", masalaItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Masala Item
masalaItemsRouter.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image } = req.body;
        const masalaItem = await MasalaItem.findByIdAndUpdate(id, { name, price, isOffer, offePercentage, foodTime, foodType, foodDescription, image }, { new: true });
        res.status(200).json({ message: "Masala item updated successfully", masalaItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Masala Item
masalaItemsRouter.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        await MasalaItem.findByIdAndDelete(id);
        res.status(200).json({ message: "Masala item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = masalaItemsRouter;