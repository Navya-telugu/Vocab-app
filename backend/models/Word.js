const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    word: { type: String, required: true },
    definition: { type: String },
    phonetics: { type: String },
    examples: [{ type: String }],
    fetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Word', wordSchema);
