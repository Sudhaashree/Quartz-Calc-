// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(() => res.status(201).json({ message: 'User registered successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
