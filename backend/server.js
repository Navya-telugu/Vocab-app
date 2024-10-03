const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Word = require('./models/Word');  // Model for Word
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());  // Allow requests from other origins (like the frontend)
app.use(express.json());  // Parse incoming JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Route for adding a new word
app.post('/api/words/add', async (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ error: 'Word is required' });
    }

    try {
        const newWord = new Word({ word });
        await newWord.save();
        res.status(201).json(newWord);  // Send back the saved word
    } catch (error) {
        console.error('Error saving word:', error);
        res.status(500).json({ error: 'Failed to save word' });
    }
});

// Route for getting all words
app.get('/api/words', async (req, res) => {
    try {
        const words = await Word.find();
        res.status(200).json(words);
    } catch (error) {
        console.error('Error fetching words:', error);
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
