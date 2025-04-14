const todos = [];

const getTodos = () => {
    return todos;
}

const newId= () => {
    //Definning the new id based on the existing ids
    const id = todos.length === 0
        ? 1 //if todos is empty, id will be 1
        : todos
            .map((todo) => todo.id) //if not, it will make a array just with the ids
            .sort() //sort them in ascending order
            .reverse() //reverse the order so the largest number is first
            [0] + 1; //and the new id will be the largest number +1

    return id;
}

const addTodo = (todo) => {
    todos.push(todo);
}

const updateTodo = (updatedTodo) => {
    //get the id to be updated
    const id = updatedTodo.id;
    const targetId = todos.findIndex((todo) => todo.id == id);

    todos[targetId] = updatedTodo;
}

const deleteTodo = (id) => {
    const targetId = todos.findIndex((todo) => todo.id == id); //find the index and return it as a number
    todos.splice(targetId, 1); //used to remove the element with the id passed.

    //update ids to avoid gaps in the number sequence
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i + 1;
    }
}

const completeTodo = (id) => {
    const targetId = todos.findIndex((todo) => todo.id == id); //find the index and return it as a number
    todos[targetId].isCompleted = !todos[targetId].isCompleted; //invert the value of .isCompleted

    return todos[targetId];
}



module.exports = {
    getTodos,
    newId,
    addTodo,
    updateTodo,
    deleteTodo,
    completeTodo
}