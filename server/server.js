const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000; // Port for the Express server

const uri = "mongodb+srv://admin:1234@fitnessapp.nc7w2x0.mongodb.net/?retryWrites=true&w=majority&appName=FitnessApp";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let dbInstance = null;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to the database
async function connectToDatabase() {
    if (!dbInstance) {
        try {
            await client.connect();
            dbInstance = client.db('FitnessAppDB');
            console.log('Connected to database');
        } catch (err) {
            console.error('Failed to connect to database', err);
            throw err;
        }
    }
    return dbInstance;
}

// Define the signup route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, age, weight, height, gender } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            age,
            weight,
            height,
            gender
        };

        await collection.insertOne(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error inserting user', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
