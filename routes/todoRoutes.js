const express = require("express");
const router = express.Router();
const todoRoutes = require("../controllers/todoControllers")
const { todos } = require('../models/todoModels') //Import todos object that will receive the tasks


// default endpoint, gets all tasks
router.get('/', (req, res) => {
    res.json(todos)
})

// a POST request with data sent in the body of the request, representing a new task to add to our list
router.post('/saveTask', (req, res) => {
    todoRoutes.saveTask(req, res);
})

// a POST request with data sent in the body of the request, representing a task to be updated to our list
router.put('/updateTask/:id', (req, res) => {
    todoRoutes.updateTask(req, res);
})

// a POST request with data sent in the body of the request, representing a task to be updated to our list
router.put('/deleteTask/:id', (req, res) => {
    todoRoutes.deleteTask(req, res);
})

// a POST request with data sent in the body of the request, representing a task to be updated to our list
router.put('/completeTask/:id', (req, res) => {
    todoRoutes.completeTask(req, res);
})

module.exports = router;