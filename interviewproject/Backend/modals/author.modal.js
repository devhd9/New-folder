const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String, required: true, },
    age: { type: Number, required: true },
    bookIds: [String],
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    updatedAt: { type: Date, default: () => Date.now() }
})

module.exports = mongoose.model('Author', authorSchema)