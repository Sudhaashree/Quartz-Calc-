const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (use your MongoDB connection string here)
mongoose.connect('mongodb://localhost:27017/quizapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define the schema for scores
const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
});

const Score = mongoose.model('Score', scoreSchema);

// Route to submit quiz score
app.post('/submit-score', async (req, res) => {
    const { name, score } = req.body;
    try {
        const newScore = new Score({ name, score });
        await newScore.save();
        res.status(200).json({ message: 'Score saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save score' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
