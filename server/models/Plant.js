const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hindiName: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    image: {
        public_id: String,
        url: String,
    },
    price: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model("Plant", PlantSchema)