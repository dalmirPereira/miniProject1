const express = require("express");
const router = express.Router();

const todoControllers = require("../controllers/todoControllers")


// default endpoint, gets all tasks for render in the frontend.
router.get('/', (req, res) => {
    const todos = todoControllers.getData();

    res.json(todos)
})

// a POST request with data sent in the body of the request, representing a new task to add to our list
router.post('/saveTask', (req, res) => {
    let todoNew = req.body;// data is sent via body
    let title = todoNew.title; //extract the new task title
    let desc = todoNew.desc; //extract the new task description

    todoControllers.saveTask(title, desc);

    const todos = todoControllers.getData();

    res.status(200).json(todos);
})

// a POST request with data sent in the body of the request, representing a task to be updated to our list
router.put('/updateTask', (req, res) => {
    let todoUpdate = req.body;// data is sent via body
    let id = todoUpdate.id; //extract the new task title
    let title = todoUpdate.title; //extract the new task title
    let desc = todoUpdate.desc; //extract the new task description

    todoControllers.updateTask(id, title, desc);

    const todos = todoControllers.getData();

    res.status(200).json(todos);
})

// a POST request with data sent in the body of the request, representing a task to be updated to our list
router.delete('/deleteTask/:id', (req, res) => {
    let id = parseInt(req.params.id); //get the id sent as parameter
    
    todoControllers.deleteTask(id);

    const todos = todoControllers.getData();

    res.status(200).json(todos);
})

// a POST request with data sent in the body of the request, representing a task to be updated to our list
router.put('/completeTask/:id', (req, res) => {

    let id = parseInt(req.params.id); //get the id sent as parameter

    todoControllers.completeTask(id);

    const todos = todoControllers.getData();

    res.status(200).json(todos);
})

module.exports = router;