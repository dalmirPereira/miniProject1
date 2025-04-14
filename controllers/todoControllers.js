const todoServices = require('../services/todoServices') //Import todos object that will receive the tasks

//-------------------------------- GET TODO LIST-----------------------------------------------
const getData = () => {
   const todos = todoServices.getTodos(); 

   return todos;
}   
//---------------------------------------------------------------------------------------

//-------------------------------- SAVE NEW TASK -----------------------------------------------
const saveTask = (title, desc) => {

    const id = todoServices.newId();

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
    todoServices.addTodo(todo);
    
}
//---------------------------------------------------------------------------------------

//-------------------------------- UPDATE NEW TASK -----------------------------------------------
const updateTask = (id, title, desc) => {

    //Get new date and transform it in dd/mm/yy format:
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Add leading zero if day < 10
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get the month (0-based) and add leading zero if month <10
    const year = String(date.getFullYear()).slice(-2);  // Get last 2 digits of the year
    const formatedDate = `${day}/${month}/${year}`;
  
    //update todos
    todoUpdated = {
      id,
      title,
      desc,
      createdAt: formatedDate,
      isCompleted: true,
    };

    todoServices.updateTodo(todoUpdated);

}
//---------------------------------------------------------------------------------------

//-------------------------------- DELETE TASK -----------------------------------------------
const deleteTask = (id) => {

    todoServices.deleteTodo(id); //redirect to Services

}
//---------------------------------------------------------------------------------------

//-------------------------------- COMPLETE TASK -----------------------------------------------
const completeTask = (id) => {

   todoServices.completeTodo(id);

}
//---------------------------------------------------------------------------------------



module.exports = {
    getData,
    saveTask,
    updateTask,
    deleteTask,
    completeTask
}