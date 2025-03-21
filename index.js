const todos = [
    // { id: 1, title: "Title1", desc: "desc", createdAt: "2025-3-19" },
    // { id: 2, title: "Title2", desc: "desc", createdAt: "2025-3-19" },
    // { id: 3, title: "Title3", desc: "desc", createdAt: "2025-3-19" },
  ];
  
  //Use bootstrap to manage modal
  const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  
  //this functions is called by the buttom New
  function modalClick() {
    //play with the buttons and text that show up in save and update
    document.getElementById("index").style.display = "none";
    document.getElementById("modalSave").style.display = "inline-block";
    document.getElementById("modalUpdate").style.display = "none";

    document.getElementById("todoForm").reset(); //reset form with the inputs for title and desc.
    myModal.toggle();
  }
  
  function modalUpdateClick(id) {
    const targetId = todos.findIndex((todo) => todo.id == id);

    document.getElementById("formTitle").value = todos[targetId].title;
    document.getElementById("formDesc").value = todos[targetId].desc;

    document.getElementById("index").style.display = "block";
    document.getElementById("index").innerHTML = `# ${id}`;

    document.getElementById("modalSave").style.display = "none";
    document.getElementById("modalUpdate").style.display = "inline-block";

    myModal.toggle();
  }

  //modalSave() is called by the button Save and will create a new task and save it in the storage object.
  function modalSave() {
    const title = document.getElementById("formTitle").value;
    const desc = document.getElementById("formDesc").value;
    const id = todos.length === 0
        ? todos.length + 1 //if todos is empty, id will be 0
        : todos
            .map((todo) => todo.id) //if not, it will make a array just if the ids
            .sort() //sort them in ascending order
            .reverse() //reverses the order so the largest number is first
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

    //hide the modal
    myModal.hide();

    //and render/update the screen
    render();
  }
  
  function modalUpdate() {
    const id = Number(document.getElementById("index").innerText.slice(2)); //get the id from the modal
    console.log(id);
    const targetId = todos.findIndex((todo) => todo.id == id);
    console.log(id);
    const title = document.getElementById("formTitle").value; //get new title
    const desc = document.getElementById("formDesc").value; //get new desc

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

    //hide modal
    myModal.hide();

    //render again
    render()
  }
  
  function todoDel(id) {
    const targetId = todos.findIndex((todo) => todo.id == id); //find the index and return it as a number
    todos.splice(targetId, 1); //used to remove the element with the id passed.

    updateId(); //update the ids so there is no windows if elements deleted.
    render(); //render after deleting the task
  }
  

  function updateId() {
    for (let i = 0; i < todos.length; i++) {
      todos[i].id = i + 1;
    }
  }

  function todoComplete(id) {
    const targetId = todos.findIndex((todo) => todo.id == id); //find the index and return it as a number
    const targetTodo = { ...todos[targetId] }; //copy object property of todos
    targetTodo.isCompleted = !targetTodo.isCompleted; //invert the value of .isCompleted
    todos[targetId] = targetTodo; //copy it back to the main object with the .isCompleted modified

    render(); //render after changing the .isCompleted status
  }
  
  function render() {
    document.getElementById("rowContainer").innerHTML = null;
    todos.forEach((todo) => {
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
          todoDel(todo.id);
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
  }
  
  