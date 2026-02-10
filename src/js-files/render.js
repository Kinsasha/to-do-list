import { loadForm, selectCards, todoCardEvents } from "./events";
import { storeProjectCard } from "./storage";
import { getCurrentProject, getProjects, setProjects } from "./todo";
import { loadProjectForm } from "./ui";
import file from "./../asset/file.svg";

const handleSubmitForm = (formData) => {
  const projects = getProjects();
  const exists = projects.some((d) => d.id === formData.id);

  if (exists) return;

  if (!exists) {
    const projectData = {
      title: formData.title,
      id: formData.id,
      todos: [],
    };
    storeProjectCard(projectData);
    renderProjectCard(projectData);
  }
};

const renderProjectCard = (projectData) => {
  const projectContainer = document.querySelector(".projectContainer");
  const projectCard = document.createElement("button");
  const project = getProjects();

  projectCard.classList.add("projectCard");

  if (!projectCard.dataset.id) projectCard.dataset.id = projectData.id;

  projectCard.innerHTML = `
  <div class='titleContainer'>
    <div 
    ><img  class="image" src="${file}"></div>
    <p class="projectTitle">${projectData.title}</p>
  </div>
  
  <div class="projectActions">
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">X</button>
  </div>
`;

  projectContainer.append(projectCard);
  selectCards();
};

const renderTodoForProject = (currentCard, todoData) => {
  const todoGrid = document.querySelector(".todoGrid");
  const project = getProjects();
  const selected = project.find((p) => p.id === currentCard);
  console.log(todoData);
  if (selected) {
    const todoContainer = document.createElement("button");
    todoContainer.classList.add("todoContainer");
    todoContainer.dataset.projectid = todoData.id;
    todoContainer.dataset.todoid = todoData.todoId;

    const isCompleted = document.createElement("input");
    isCompleted.type = "checkbox";
    isCompleted.classList.add("checkbox");
    isCompleted.checked = todoData.isCompleted;

    const todoTitleContainer = document.createElement("div");
    todoTitleContainer.classList.add("todoTitleContainer");

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todoTitle");
    todoTitle.textContent = todoData.name;
    todoTitleContainer.append(todoTitle);

    const dueDate = document.createElement("span");
    if (todoData.dueDate == null) {
      dueDate.classList.add("dueDate", "noDeadline");
      dueDate.textContent = "No Deadline";
    } else {
      dueDate.classList.add("dueDate");
      dueDate.textContent = todoData.dueDate;
    }

    const priority = document.createElement("div");
    priority.classList.add(`priorityLevel`);
    priority.textContent = todoData.priorityLevel;

    const btnContainerTodo = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "X";

    btnContainerTodo.classList.add("btnContainerTodo");
    editBtn.classList.add("editBtn");
    deleteBtn.classList.add("deleteBtn");

    btnContainerTodo.append(editBtn, deleteBtn);

    todoContainer.append(
      todoTitleContainer,
      dueDate,
      priority,
      isCompleted,
      btnContainerTodo
    );

    todoGrid.append(todoContainer);
  }
  todoCardEvents();
};

const displayProjects = () => {
  const projectContainer = document.querySelector(".projectContainer");
  const projects = getProjects();

  projects.forEach((project) => {
    const projectCard = document.createElement("button");

    projectCard.classList.add("projectCard");
    if (!projectCard.dataset.id) projectCard.dataset.id = project.id;

    if (project.id === `No.1`) {
      projectCard.dataset.default = true;
    }

    projectCard.innerHTML = `
  <div class='titleContainer'>
    <div><img  class="image" src="${file}"></div>
    <p class="projectTitle">${project.title}</p>
  </div>
  <div class="projectActions">
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">X</button>
  </div>
`;

    projectContainer.append(projectCard);
  });
  // return { projectCard };
};

const editProject = () => {
  const { projectForm, titleInput } = loadProjectForm();

  titleInput.placeholder = "Change Project Name";

  projectForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("submitBtn")) {
      e.preventDefault();
      const projectContainer = document.querySelector(".projectContainer");

      const editedName = titleInput.value;

      let myProjects = getProjects();
      let currentCard = getCurrentProject();

      const updated = myProjects.map((p) =>
        p.id === currentCard ? { ...p, title: editedName } : p
      );

      setProjects(updated);
      projectContainer.replaceChildren();
      displayProjects();

      document.querySelector(".projectFormContainer").remove();
    }

    if (e.target.classList.contains("cancelBtn")) {
      document.querySelector(".projectFormContainer").remove();
    }
  });
};
//
//
//
//
//
//
const selectDefault = () => {
  const defaultCard = document.querySelector(".defaultProjectCard");

  defaultCard.classList.add("active");
};

export {
  handleSubmitForm,
  editProject,
  displayProjects,
  selectDefault,
  renderTodoForProject,
};
