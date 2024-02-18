const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://rahulnegi065:simpleSa065@testcluster.mwckz5f.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'broomees'
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

app.use(cors());
app.use(express.json());

app.post('/api/register', async(req,res) => {
    try {
        const body = req.body;
        if(!body.name || !body.email || !body.username || !body.password) {
            return res.status(400).json({message: "Bad request!"})
        }

        await User.create({
            name: body.name,
            email: body.email,
            username: body.username,
            password: body.password,
        })
        return res.status(201).json({message: "User created successfully!"})
    } catch (error) {
        console.log("Error while creating user:", error);
        if(error.code===11000 && error.keyPattern.username) {
            return res.status(400).json({message: "Username already exists!"});
        } else if(error.code===11000 && error.keyPattern.email) {
            return res.status(400).json({message: "Email already exists!"});
        } else res.status(500).json({ message: 'Error creating user!' });
    }
})

app.post('/api/login', async(req,res) => {
    try {
        const body = req.body;
        if(!body.username || !body.password) {
            return res.status(400).json({message: "Bad request!"})
        }
        const { username, password } = body;
        const user = await User.findOne({ username, password });
        if(!user) return res.status(401).json({ message: "User not found!" });
        return res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});