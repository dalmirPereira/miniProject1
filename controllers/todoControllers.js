const { todos } = require('../models/todoModels') //Import todos object that will receive the tasks

//-------------------------------- SAVE NEW TASK -----------------------------------------------
const saveTask = (req, res) => {
    let todoNew = req.body;// data is sent via body
    let title = todoNew.title; //extract the new task title
    let desc = todoNew.desc; //extract the new task description

    //Definning the new id based on the existing ids
    const id = todos.length === 0
        ? 1 //if todos is empty, id will be 1
        : todos
            .map((todo) => todo.id) //if not, it will make a array just with the ids
            .sort() //sort them in ascending order
            .reverse() //reverse the order so the largest number is first
            [0] + 1; //and the new id will be the largest number +1

    //Get date and transform it in dd/mm/yy format:
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Add leading zero if day < 10
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get the month (0-based) and add leading zero if month <10
    const year = String(date.getFullYear()).slice(-2);  // Get last 2 digits of the year
    const formatedDate = `${day}/${month}/${year}`;

    //create the new task
    const todo = {
      id,
      title,
      desc,
      createdAt: formatedDate,
      isCompleted: true,
    };

    //push it in the storage object.
    todos.push(todo);

    res.status(200).json(todos);
}
//---------------------------------------------------------------------------------------

//-------------------------------- UPDATE NEW TASK -----------------------------------------------
const updateTask = (req, res) => {
    let todoUpdate = req.body;// data is sent via body
    let id = parseInt(req.params.id); //get the id sent as parameter
    let title = todoUpdate.title; //extract the new task title
    let desc = todoUpdate.desc; //extract the new task description
    
    //get the id to be updated
    const targetId = todos.findIndex((todo) => todo.id == id);
 
    //Get new date and transform it in dd/mm/yy format:
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Add leading zero if day < 10
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get the month (0-based) and add leading zero if month <10
    const year = String(date.getFullYear()).slice(-2);  // Get last 2 digits of the year
    const formatedDate = `${day}/${month}/${year}`;
  
    //update todos
    todos[targetId] = {
      id,
      title,
      desc,
      createdAt: formatedDate,
      isCompleted: true,
    };

    res.status(200).json(todos);
}
//---------------------------------------------------------------------------------------

//-------------------------------- DELETE TASK -----------------------------------------------
const deleteTask = (req, res) => {
    let id = parseInt(req.params.id); //get the id sent as parameter

    const targetId = todos.findIndex((todo) => todo.id == id); //find the index and return it as a number
    todos.splice(targetId, 1); //used to remove the element with the id passed.

    //update ids to avoid gaps in the number sequence
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i + 1;
    }

    res.status(200).json(todos);
}
//---------------------------------------------------------------------------------------

//-------------------------------- DELETE TASK -----------------------------------------------
const completeTask = (req, res) => {
    let id = parseInt(req.params.id); //get the id sent as parameter

    const targetId = todos.findIndex((todo) => todo.id == id); //find the index and return it as a number
    todos[targetId].isCompleted = !todos[targetId].isCompleted; //invert the value of .isCompleted

    res.status(200).json(todos);
}
//---------------------------------------------------------------------------------------



module.exports = {
    saveTask,
    updateTask,
    deleteTask,
    completeTask
}