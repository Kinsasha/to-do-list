import { handleSubmitForm } from "./render";

const loadDefaultDOM = () => {
  const content = document.querySelector(".content");
  const sideBar = document.querySelector(".sideBar");
  const header = document.querySelector(".heroText");

  const addProjectText = document.createElement("div");
  const addProjectBtn = document.createElement("button");

  addProjectText.classList.add("addProjectText");
  addProjectBtn.classList.add("addProjectBtn");

  addProjectText.textContent = `Projects`;
  addProjectBtn.textContent = `Add a Project`;

  sideBar.append(addProjectText, addProjectBtn);

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

  // const dueDateContainer = document.createElement("div");
  // const dueDateInput = document.createElement("input");
  // dueDateContainer.classList.add("dueDateContainer");
  // dueDateInput.classList.add("dueDateInput");
  // dueDateInput.type = "date";
  // dueDateContainer.append(dueDateInput);

  // const priorityContainer = document.createElement("div");
  // const priorityText = document.createElement("p");
  // const priorityLevel = document.createElement("input");
  // priorityContainer.classList.add("priorityContainer");
  // priorityLevel.classList.add("priorityLevel");
  // priorityLevel.type = "range";
  // priorityContainer.append(priorityText, priorityLevel);

  // priorityText.textContent = "PRIORITY LEVEL";

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
  projectForm.append(
    titleContainer,
    formTitle,
    // dueDateContainer,
    // priorityContainer,
    btnContainer
  );
  projectFormContainer.append(formTitle, projectForm);

  content.append(projectFormContainer);
  titleInput.focus();

  return {
    projectForm,
    titleInput,
    // dueDateInput,
    // priorityLevel,
    submitBtn,
    cancelBtn,
  };
};

const loadSavedCards = () => {
  const savedCards = JSON.parse(localStorage.getItem("projects"));

  if (savedCards)
    savedCards.forEach((formData) => {
      handleSubmitForm(formData);
    });
};

export { loadDefaultDOM, loadProjectForm, loadSavedCards };
