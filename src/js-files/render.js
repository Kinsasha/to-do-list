import { loadForm } from "./events";
import { storeProjectCard } from "./storage";
import { loadProjectForm } from "./ui";

const handleSubmitForm = (formData) => {
  const sideBar = document.querySelector(".sideBar");
  const projectCard = document.createElement("div");
  projectCard.dataset.id = formData.id || crypto.randomUUID();
  const projectCardId = projectCard.dataset.id;

  projectCard.classList.add("projectCard");

  projectCard.innerHTML = `
  <p class="projectTitle">${formData.title}</p>
  
  <div class="projectActions">
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">X</button>
  </div>
`;
  sideBar.append(projectCard);

  const projectData = {
    title: formData.title,
    id: projectCardId,
  };

  if (!formData.id) {
    const projectData = {
      title: formData.title,
      id: projectCardId,
    };
    storeProjectCard(projectData);
  }

  return { projectCard };
};

const editProject = (projectCard) => {
  const {
    projectForm,
    titleInput,
    dueDateInput,
    priorityLevel,
    submitBtn,
    cancelBtn,
  } = loadProjectForm();

  titleInput.placeholder = "Change Project Name";

  projectForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("submitBtn")) {
      e.preventDefault();

      const editedName = titleInput.value;

      projectCard.innerHTML = projectCard.innerHTML = `
  <p class="projectTitle">${editedName}</p>
  
  <div class="projectActions">
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">X</button>
  </div>
`;

      let myProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const updated = myProjects.map((p) =>
        p.id === projectCard.dataset.id ? { ...p, title: editedName } : p
      );

      console.log(updated);

      localStorage.setItem("projects", JSON.stringify(updated));

      document.querySelector(".projectFormContainer").remove();
    }

    if (e.target.classList.contains("cancelBtn")) {
      document.querySelector(".projectFormContainer").remove();
    }
  });
};
export { handleSubmitForm, editProject };
