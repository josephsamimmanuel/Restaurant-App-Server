const mongoose = require("mongoose");

const masalaItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isOffer: {
        type: Boolean,
        default: false,
    },
    offePercentage: {
        type: String,
        default: '',
    },
    foodTime: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    foodDescription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("MasalaItem", masalaItemSchema);