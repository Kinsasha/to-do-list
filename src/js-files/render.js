import { loadForm, selectCards } from "./events";
import { storeProjectCard } from "./storage";
import { getCurrentProject, getProjects, setProjects } from "./todo";
import { loadProjectForm } from "./ui";

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
  <p class="projectTitle">${projectData.title}</p>
  
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

  if (selected) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer");
    // if (todo.isCompleted) todoContainer.classList.add("completed");

    const isCompleted = document.createElement("input");
    isCompleted.type = "checkbox";
    isCompleted.classList.add("myCheckbox");
    isCompleted.checked = todoData.isCompleted;

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todoTitle");
    todoTitle.textContent = todoData.name;

    const dueDate = document.createElement("span");
    dueDate.classList.add("dueDate");
    dueDate.textContent = todoData.dueDate;

    const priority = document.createElement("div");
    priority.classList.add(`priorityLevel`);
    priority.textContent = todoData.priorityLevel;

    todoContainer.append(todoTitle, dueDate, priority, isCompleted);

    todoGrid.append(todoContainer);
  }
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
    <input 
    type="checkbox" 
    class="myCheckbox"
  >
  <p class="projectTitle">${project.title}</p>
  
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

      console.log(updated);

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
