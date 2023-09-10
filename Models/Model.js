const mongoose = require("mongoose");
const compSchema = new mongoose.Schema(
    {
        name: {type: String,
        trim: true,
        required: true},
        email: {type: String,
        trim: true,
        required: true},
        branch: {type: String,
        trim: true,
        required: true},
        roll: {type: Number,
        trim: true,
        required: true},
        date: {type: String,
        trim: true,
        required: true},
        phone: {type: Number,
        trim: true,
        required: true},
        comp: {type: String,
        trim: true,
        required: true}
    },
    {timestamps: true}
)
const collection = mongoose.model("table-data", compSchema);
module.exports = collection;