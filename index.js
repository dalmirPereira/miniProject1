const express = require('express');
const path = require('path'); // To handle file paths correctly

const app = express();
const port = 3000;

app.use(express.json()) //for accessing req.body in routes

//------------------------Connecting static page----------------------------------------
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Route to serve the index.html file
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'todo.html'));
});

//------------------------Connecting routes----------------------------------------
//Import all todo routes
const todoRoutes = require('./routes/todoRoutes');
//Map the todo routes to our app
app.use('/todolist', todoRoutes);

//------------------------Initiating port1----------------------------------------
app.listen(port, () => {
    console.log(`Example app listening
at http://localhost:${port}`);
});