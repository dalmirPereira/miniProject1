
//------------------------------------- MODAL RENDER FUNCTIONS -----------------------------
//Use bootstrap to manage modal
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

//this functions is called by the buttom New and play with the buttons and text that show up in save and update
function modalClick() {
  document.getElementById("index").style.display = "none";
  document.getElementById("modalSave").style.display = "inline-block";
  document.getElementById("modalUpdate").style.display = "none";

  document.getElementById("todoForm").reset(); //reset form with the inputs for title and desc.
  myModal.toggle();
}

//this functions is called by the buttom Update and play with the buttons and text that show up in save and update
function modalUpdateClick(id) {
  
  fetch(`http://localhost:3000/todolist/`)
    .then(response => {
      if (!response.ok) { //This is a boolean provided by the Fetch API. It's true if the response status is in the range 200–299 (successful)
        throw new Error('Failed to complete task');
      }
  
      return response.json();
    })
    .then(data => {
      console.log('Modal Update Task request:', data);
      
      const targetId = data.findIndex((todo) => todo.id == id);

      document.getElementById("formTitle").value = data[targetId].title;
      document.getElementById("formDesc").value = data[targetId].desc;

      document.getElementById("index").style.display = "block";
      document.getElementById("index").innerHTML = `# ${id}`;

      document.getElementById("modalSave").style.display = "none";
      document.getElementById("modalUpdate").style.display = "inline-block";

      myModal.toggle();
    })
    .catch(error => {
      console.error('Error saving task:', error);
    });
}
//-----------------------------------------------------------------------------------

//---------------------------------------- SAVE NEW TASK ---------------------------------
//modalSave() is called by the button Save and will create a new task and save it in the storage object.
function modalSave() {
  //get the data from the modal
  const title = document.getElementById("formTitle").value;
  const desc = document.getElementById("formDesc").value;

  console.log(title, desc);
  
  // Prepare the data to send
  const todoNew = {
    title: title,
    desc: desc
  };

  // Send the POST request to your server
  fetch('http://localhost:3000/todolist/saveTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' //headers tell the server it is being sent a data in JSON format.
    },
    body: JSON.stringify(todoNew) //fetch expects the body to be a string, not a JavaScript object.
  })
  .then(response => {
    if (!response.ok) { //This is a boolean provided by the Fetch API. It's true if the response status is in the range 200–299 (successful)
      throw new Error('Failed to save task');
    }

    return response.json();
  })
  .then(data => {
    console.log('New Task Saved. New List:', data);

    //hide the modal
    myModal.hide();

    render();
  })
  .catch(error => {
    console.error('Error saving task:', error);
  });
}
//---------------------------------------------------------------------------------------------------

//---------------------------------------- UPDATE TASK ---------------------------------
function modalUpdate() {
  const id = document.getElementById("index").innerText.slice(2); //get the id from the modal
  const title = document.getElementById("formTitle").value; //get new title
  const desc = document.getElementById("formDesc").value; //get new desc

  // Prepare the data to send
  const todoUpdate = {
    title: title,
    desc: desc
  };

  // Send the POST request to your server
  fetch(`http://localhost:3000/todolist/updateTask/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' //headers tell the server it is being sent a data in JSON format.
    },
    body: JSON.stringify(todoUpdate) //fetch expects the body to be a string, not a JavaScript object.
  })
  .then(response => {
    if (!response.ok) { //This is a boolean provided by the Fetch API. It's true if the response status is in the range 200–299 (successful)
      throw new Error('Failed to update task');
    }

    return response.json();
  })
  .then(data => {
    console.log('Task Updated. New List:', data);

    //hide the modal
    myModal.hide();

    render();
  })
  .catch(error => {
    console.error('Error saving task:', error);
  });   
}
//---------------------------------------------------------------------------------------------------

//---------------------------------------- DELETE TASK ---------------------------------
function todoDelete(id) {
  // Send the POST request to your server
  fetch(`http://localhost:3000/todolist/deleteTask/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' //headers tell the server it is being sent a data in JSON format.
    },
    body: JSON.stringify(todoDelete) //fetch expects the body to be a string, not a JavaScript object.
  })
  .then(response => {
    if (!response.ok) { //This is a boolean provided by the Fetch API. It's true if the response status is in the range 200–299 (successful)
      throw new Error('Failed to save task');
    }

    return response.json();
  })
  .then(data => {
    console.log('Task Deleted. New List:', data);

    render();
  })
  .catch(error => {
    console.error('Error saving task:', error);
  });   
}
//---------------------------------------------------------------------------------------------------

//---------------------------------------- COMPLETE TASK ---------------------------------
function todoComplete(id) {
  // Send the POST request to your server
  fetch(`http://localhost:3000/todolist/completeTask/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' //headers tell the server it is being sent a data in JSON format.
    },
    body: JSON.stringify(todoComplete) //fetch expects the body to be a string, not a JavaScript object.
  })
  .then(response => {
    if (!response.ok) { //This is a boolean provided by the Fetch API. It's true if the response status is in the range 200–299 (successful)
      throw new Error('Failed to complete task');
    }

    return response.json();
  })
  .then(data => {
    console.log('Task Completed. New List:', data);

    render();
  })
  .catch(error => {
    console.error('Error saving task:', error);
  });   
}
//---------------------------------------------------------------------------------------------------

//---------------------------------------- RENDER PAGE/DATA ---------------------------------
function render() {
    document.getElementById("rowContainer").innerHTML = null; //Clean the data before printing again

    fetch(`http://localhost:3000/todolist/`)
    .then(response => {
      if (!response.ok) { //This is a boolean provided by the Fetch API. It's true if the response status is in the range 200–299 (successful)
        throw new Error('Failed to complete task');
      }
  
      return response.json();
    })
    .then(data => {
      console.log('Render:', data);
  
      data.forEach((todo) => {
        if (todo) {
          //clone the template id="rowTemplate" which is a table and each element is a cell,
          //and each template is a row.
          const template = document
            .getElementById("rowTemplate")
            .content.cloneNode(true);
  
          //Updating the elements of the template clonned 
          template.getElementById("id").innerHTML = todo.id;
          template.getElementById("title").innerHTML = todo.isCompleted
            ? todo.title
            : `<del>${todo.title}</del>`; //If the .isCompleted property is true, it will return the text with a strikethrough.
          template.getElementById("desc").innerHTML = todo.isCompleted
            ? todo.desc
            : `<del>${todo.desc}</del>`;//If the .isCompleted property is true, it will return the text with a strikethrough.
          template.getElementById("createdAt").innerHTML = todo.createdAt;
  
          template.getElementById("todoUpdate").addEventListener("click", () => {
            modalUpdateClick(todo.id);
          }); 
          template.getElementById("todoDel").addEventListener("click", () => {
            todoDelete(todo.id);
          });
  
          template.getElementById("todoComplete").checked = !todo.isCompleted; //It makes the check box checked or unchecked depending on .isCompleted.
          template.getElementById("todoComplete").addEventListener("click", (e) => {
            e.preventDefault(); //prevent the page to reload
            todoComplete(todo.id);
          });
    
          // include the populated template into the page
          document.getElementById("rowContainer").appendChild(template);
        }
      });
    })
    .catch(error => {
      console.error('Error saving task:', error);
    });   
  } render(); //execute render for the first time our update in the page
  
  