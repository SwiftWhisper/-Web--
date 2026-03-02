require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Note = require('./models/Note');

const app = express();
app.use(cors()); 
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error:', err));

app.get("/", (req, res) => {
    res.send("Головна сторінка");
});

app.get('/notes', async (req, res) => {
try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.get('/notes/:id', async (req, res) => {
try {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.post('/notes', async (req, res) => {
try {
    const { title, text } = req.body
    if(!title || !text){
        return res.status(400).json({ error: "title and text are required" });
    }
    const note = new Note({ title, text });    
    await note.save();

    res.status(201).json(note);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.put('/notes/:id', async (req, res) => {
try {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const { title, text } = req.body;
    if(!title || !text){
        return res.status(400).json({ error: "title and text are required" });
    }
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true});

    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.delete('/notes/:id', async (req, res) => {
try {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
    }
    
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).send();
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.listen(PORT, () => {
console.log("Server is running on port 3000");
});