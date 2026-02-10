import {
  addCardToDOM,
  handleSubmitForm,
  editProject,
  renderTodoForProject,
} from "./render";
import {
  getCurrentProject,
  getProjects,
  setCurrentProject,
  deleteTodoFromStorage,
  toggleTodo,
} from "./todo";
import {
  loadDefaultDOM,
  loadProjectForm,
  loadTodoForm,
  displayTodosForProject,
} from "./ui";
import { storeTodoData, getTodosForProject } from "./storage";

const loadForm = (btn) => {
  btn.addEventListener("click", () => {
    const formElements = loadProjectForm();
    disableAllBtns();

    formElements.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let project = getProjects();

      const formData = {
        title: formElements.titleInput.value.trim(),
        id: crypto.randomUUID(),
      };

      if (formData.title === "") return alert("Project title cannot be empty");

      if (
        project.some(
          (data) => data.title.toLowerCase() === formData.title.toLowerCase()
        )
      ) {
        alert("You cannot have two projects with the same name.");
        formElements.projectForm.reset();
        return;
      } else {
        handleSubmitForm(formData);
      }

      formElements.projectForm.reset();
      document.querySelector(".projectFormContainer").remove();

      enableAllBtns();
    });
    formElements.cancelBtn.addEventListener("click", (e) => {
      formElements.projectForm.reset();
      document.querySelector(".projectFormContainer").remove();
      enableAllBtns();
    });
  });
};

const setupProjectCard = () => {
  const sideBar = document.querySelector(".sideBar");
  const todoGrid = document.querySelector(".todoGrid");

  sideBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const projectCard = e.target.closest(".projectCard");

      let myProjects = getProjects();
      const modifiedData = myProjects.filter(
        (p) => p.id !== projectCard.dataset.id
      );

      localStorage.setItem("projects", JSON.stringify(modifiedData));

      projectCard.remove();
      todoGrid.replaceChildren();
    }

    if (e.target.classList.contains("editBtn")) {
      const projectCard = e.target.closest(".projectCard");

      editProject(projectCard);
    }
  });
};

const selectCards = () => {
  const sideBar = document.querySelector(".sideBar");
  const projectCard = document.querySelectorAll(".projectCard");

  projectCard.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;

      setCurrentProject(id);

      const currentCard = getCurrentProject();
      // console.log(currentCard);
      document.querySelectorAll(".projectCard").forEach((card) => {
        card.classList.remove("active");
      });
      card.classList.add("active");

      const todos = getTodosForProject(id);
      displayTodosForProject(id, todos);
    });
  });
};

const todoEvent = () => {
  const addTodoBtn = document.querySelector(".addTodoBtn");
  addTodoBtn.addEventListener("click", () => {
    const currentCard = getCurrentProject();
    if (currentCard === null) {
      alert("Pick a Project first");
      return;
    }
    const {
      todoFormContainer,
      todoForm,
      titleInput,
      dueDateInput,
      priorityLevel,
      submitBtn,
      cancelBtn,
    } = loadTodoForm();
    disableAllBtns();
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const finalDate = dueDateInput.value || null;

      //safeguards
      const inputDate = new Date(dueDateInput.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      if (currentDate > inputDate) {
        alert("You cannot set deadline in the past");
        dueDateInput.value = "";
        return;
      }

      if (titleInput.value === "") {
        alert("Project title cannot be empty");
        return;
      }
      let level;
      if (priorityLevel.value <= 33) {
        level = priorityLevel.value = "Low Priority";
      } else if (priorityLevel.value > 33 && priorityLevel.value <= 66) {
        level = priorityLevel.value = "Medium Priority";
      }
      if (priorityLevel.value > 66 && priorityLevel.value <= 100) {
        level = priorityLevel.value = "High Priority";
      }

      const todoData = {
        id: currentCard,
        todoId: crypto.randomUUID(),
        name: titleInput.value,
        dueDate: finalDate,
        priorityLevel: level,
        isCompleted: false,
      };

      storeTodoData(todoData);
      renderTodoForProject(currentCard, todoData);
      todoFormContainer.remove();
      enableAllBtns();
    });
    cancelBtn.addEventListener("click", () => {
      todoForm.reset();
      todoFormContainer.remove();
      enableAllBtns();
      return;
    });
  });
};

const todoCardEvents = () => {
  const todoGrid = document.querySelector(".todoGrid");
  todoGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const card = e.target.closest(".todoContainer");

      const todoID = card.dataset.todoid;
      const projectID = card.dataset.projectid;
      deleteTodoFromStorage(projectID, todoID);
      card.remove();
    }
  });

  todoGrid.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox")) {
      const card = e.target.closest(".todoContainer");

      const todoID = card.dataset.todoid;
      const projectID = card.dataset.projectid;

      const isCompleted = e.target.checked;

      if (isCompleted) {
        card.classList.add("completed");
      } else {
        card.classList.remove("completed");
      }
      // console.log(isCompleted);
      toggleTodo(projectID, todoID, isCompleted);
    }
  });
};

const disableAllBtns = () => {
  const projectCard = document.querySelectorAll(".projectCard");
  const addTodoBtn = document.querySelector(".addTodoBtn");
  const addProjectBtn = document.querySelector(".addProjectBtn");
  const todoCard = document.querySelectorAll(".todoContainer");
  const editBtn = document.querySelectorAll(".editBtn");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const myCheckbox = document.querySelectorAll(".checkbox");

  projectCard.forEach((card) => {
    card.disabled = true;
  });
  todoCard.forEach((card) => {
    card.disabled = true;
    editBtn.disabled = true;
    deleteBtn.disabled = true;
  });
  addTodoBtn.disabled = true;
  addProjectBtn.disabled = true;
};
const enableAllBtns = () => {
  const projectCard = document.querySelectorAll(".projectCard");
  const addTodoBtn = document.querySelector(".addTodoBtn");
  const addProjectBtn = document.querySelector(".addProjectBtn");
  const todoCard = document.querySelectorAll(".todoContainer");
  const editBtn = document.querySelectorAll(".editBtn");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const myCheckbox = document.querySelectorAll(".checkbox");

  projectCard.forEach((card) => {
    card.disabled = false;
  });
  todoCard.forEach((card) => {
    card.disabled = false;
    editBtn.disabled = false;
    deleteBtn.disabled = false;
  });
  addTodoBtn.disabled = false;
  addProjectBtn.disabled = false;
};

export { loadForm, setupProjectCard, todoEvent, selectCards, todoCardEvents };
