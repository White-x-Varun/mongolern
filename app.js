const express = require('express');
const app = express();
const userModel = require('./mongo');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Show user creation form
app.get('/', (req, res) => {
    res.render('form');
});

// CREATE user
app.post('/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new userModel({ username, email, password });
        await user.save();
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// READ all users
app.get('/users', async (req, res) => {
    const users = await userModel.find();
    res.render('users', { users });
});

// UPDATE form
app.get('/edit/:id', async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.render('edit', { user });
});

// UPDATE logic
app.post('/update/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await userModel.findByIdAndUpdate(req.params.id, { username, email, password });
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
});

// DELETE user
app.get('/delete/:id', async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
});

// Server
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
