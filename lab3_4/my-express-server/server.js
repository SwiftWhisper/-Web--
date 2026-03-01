const express = require('express');
const app = express();
app.use(express.json()); // Обов'язково для роботи з JSON

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Інфа
const items = [ 
 { id: 1, name: "Товар 1", price: 100 },
 { id: 2, name: "Товар 2", price: 200 }
];

app.get("/", (req, res) => {
    res.send("Головна сторінка магазину");
});

// Вивести всі товари
app.get("/items", (req, res) => {
    res.json(items);
});

// Вивести товар за айді
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === id)

    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
});

// Додати товар
app.post("/items", (req, res) => {
    const { id, name, price } = req.body;
    if (typeof id != "number" || typeof name != "string" || typeof price != "number"){
        return res.status(400).json({ error: "Invalid item format" });
    }
    if (items.some(i => i.id === id)){
        return res.status(409).json({ error: "Item with this id already exists" });
    }

    const item = {id, name, price}
    items.push(item)

    res.status(201).json(item);
});

// Замінити існуючий товар
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === id)

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    const {name, price } = req.body;
    if (typeof name != "string" || typeof price != "number"){
        return res.status(400).json({ error: "Invalid item format" });
    }

    const updatedItem = {id, name, price}
    items[itemIndex] = updatedItem

    res.json(updatedItem);
});

//  Видалити товар за айди
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === id)

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    items.splice(itemIndex, 1);
    res.status(204).send(); // No Content

    res.json(item);
});

app.listen(3000, () => {
console.log("Server is running on port 3000");
});