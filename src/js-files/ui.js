import { displayProjects } from "./render";
import { storeDefaultProject } from "./storage";
import { getProjects, currentState } from "./todo";
import { todoCardEvents } from "./events";

const loadDefaultDOM = () => {
  const content = document.querySelector(".content");
  const sideBar = document.querySelector(".sideBar");
  const header = document.querySelector(".heroText");

  const addProjectText = document.createElement("div");
  const addProjectBtn = document.createElement("button");
  const projectContainer = document.createElement("div");

  const addTodoBtn = document.createElement("button");
  const addTodoBtnContainer = document.createElement("div");
  const todoGrid = document.createElement("div");

  addTodoBtn.textContent = `Add Todo`;
  addTodoBtnContainer.classList.add("addTodoBtnContainer");
  addTodoBtn.classList.add("addTodoBtn");
  todoGrid.classList.add("todoGrid");

  addProjectText.classList.add("addProjectText");
  addProjectBtn.classList.add("addProjectBtn");
  projectContainer.classList.add("projectContainer");

  addProjectText.textContent = `Projects`;
  addProjectBtn.textContent = `Add a Project`;

  sideBar.append(addProjectText, addProjectBtn, projectContainer);

  addTodoBtnContainer.append(addTodoBtn);
  content.append(addTodoBtnContainer, todoGrid);

  storeDefaultProject();

  return { addProjectBtn };
};

const loadProjectForm = () => {
  const content = document.querySelector(".content");
  const projectFormContainer = document.createElement("div");
  projectFormContainer.classList.add("formContainer", "projectFormContainer");

  const projectForm = document.createElement("form");
  projectForm.classList.add("projectForm");

  const formTitle = document.createElement("p");
  formTitle.classList.add("formTitle");
  formTitle.textContent = "PROJECT FORM";

  const titleContainer = document.createElement("div");
  const titleInput = document.createElement("input");
  titleContainer.classList.add("titleContainer");
  titleInput.classList.add("titleInput");
  titleInput.type = "text";
  titleInput.placeholder = "Project title";
  titleContainer.append(titleInput);

  const btnContainer = document.createElement("div");
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submitBtn");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Project";
  btnContainer.classList.add("btnContainer");

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancelBtn");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  btnContainer.append(submitBtn, cancelBtn);

  projectForm.append(titleContainer, formTitle, btnContainer);
  projectFormContainer.append(formTitle, projectForm);

  content.append(projectFormContainer);
  titleInput.focus();

  return {
    projectForm,
    titleInput,
    submitBtn,
    cancelBtn,
  };
};

const loadTodoForm = () => {
  const content = document.querySelector(".content");
  const todoFormContainer = document.createElement("div");
  todoFormContainer.classList.add("formContainer", "todoFormContainer");

  const todoForm = document.createElement("form");
  todoForm.classList.add("todoForm");

  const formTitle = document.createElement("p");
  formTitle.classList.add("formTitle");
  formTitle.textContent = "TODO FORM";

  const titleContainer = document.createElement("div");
  const titleInput = document.createElement("input");
  titleContainer.classList.add("titleContainer");
  titleInput.classList.add("titleInput");
  titleInput.type = "text";
  titleInput.placeholder = "Project title";
  titleContainer.append(titleInput);

  const dueDateContainer = document.createElement("div");
  const dueDateInput = document.createElement("input");
  dueDateContainer.classList.add("dueDateContainer");
  dueDateInput.classList.add("dueDateInput");
  dueDateInput.type = "date";
  dueDateContainer.append(dueDateInput);

  const priorityContainer = document.createElement("div");
  const priorityText = document.createElement("p");
  const priorityLevel = document.createElement("input");
  priorityContainer.classList.add("priorityContainer");
  priorityLevel.classList.add("priorityLevel");
  priorityLevel.type = "range";
  priorityContainer.append(priorityText, priorityLevel);

  priorityText.textContent = "PRIORITY LEVEL";

  const btnContainer = document.createElement("div");
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submitBtn");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Project";
  btnContainer.classList.add("btnContainer");

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancelBtn");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  btnContainer.append(submitBtn, cancelBtn);

  // append inputs and buttons to form
  todoForm.append(
    titleContainer,
    formTitle,
    dueDateContainer,
    priorityContainer,
    btnContainer
  );
  todoFormContainer.append(formTitle, todoForm);

  content.append(todoFormContainer);
  titleInput.focus();

  return {
    todoFormContainer,
    todoForm,
    titleInput,
    dueDateInput,
    priorityLevel,
    submitBtn,
    cancelBtn,
  };
};

const loadSavedCards = () => {
  const savedCards = getProjects();
  if (savedCards) displayProjects();
};

const displayTodosForProject = (id, todos) => {
  const todoGrid = document.querySelector(".todoGrid");
  const savedTodos = getProjects();
  const selected = savedTodos.find((p) => p.id === id);

  if (selected) {
    todoGrid.innerHTML = "";
    // console.log(selected.todos);
    selected.todos.forEach((todo) => {
      const todoContainer = document.createElement("button");
      todoContainer.classList.add("todoContainer", "todoCard");
      todoContainer.dataset.projectid = todo.id;
      todoContainer.dataset.todoid = todo.todoId;

      if (todo.isCompleted) {
        todoContainer.classList.add("completed");
      }

      const isCompleted = document.createElement("input");
      isCompleted.type = "checkbox";
      isCompleted.classList.add("checkbox");
      isCompleted.checked = todo.isCompleted;

      const todoTitle = document.createElement("p");
      todoTitle.classList.add("todoTitle");
      todoTitle.textContent = todo.name;

      const dueDate = document.createElement("span");
      dueDate.classList.add("dueDate");
      dueDate.textContent = todo.dueDate;

      const priority = document.createElement("div");
      priority.classList.add(`priorityLevel`);
      priority.textContent = todo.priorityLevel;

      const btnContainerTodo = document.createElement("div");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      btnContainerTodo.classList.add("btnContainerTodo");
      editBtn.classList.add("editBtn");
      deleteBtn.classList.add("deleteBtn");

      editBtn.textContent = "Edit";
      deleteBtn.textContent = "X";

      btnContainerTodo.append(editBtn, deleteBtn);

      todoContainer.append(
        todoTitle,
        dueDate,
        priority,
        isCompleted,
        btnContainerTodo
      );

      todoGrid.append(todoContainer);
    });
  }
  todoCardEvents();
};

export {
  loadDefaultDOM,
  loadProjectForm,
  loadSavedCards,
  loadTodoForm,
  displayTodosForProject,
};
