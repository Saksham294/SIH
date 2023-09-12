const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        public_id: String,
        url: String,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Please enter a price"],
    },
    description: {
        type: String,
        required: [true, "Please enter a description"],
    },
    mainCategory: {
        type: String,
        required: [true, "Please enter a category"],
    },
    subCategory: {
        type: String,
        required: [true, "Please enter a category"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    viewCount: {
        type: Number,
        default: 0
    },
    boughtBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    visitedBy: ["tapasvi", {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

})

module.exports = mongoose.model("Product", productSchema)