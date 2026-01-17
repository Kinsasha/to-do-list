import { addCardToDOM, handleSubmitForm, editProject } from "./render";
import { loadDefaultDOM, loadProjectForm } from "./ui";

const loadForm = (btn) => {
  btn.addEventListener("click", () => {
    const formElements = loadProjectForm();

    btn.disabled = true;

    formElements.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const formData = {
        title: formElements.titleInput.value,
      };

      handleSubmitForm(formData);

      formElements.projectForm.reset();
      document.querySelector(".projectFormContainer").remove();

      btn.disabled = false;
    });
    formElements.cancelBtn.addEventListener("click", (e) => {
      formElements.projectForm.reset();
      document.querySelector(".projectFormContainer").remove();

      btn.disabled = false;
    });
  });
};

const setupProjectCard = () => {
  const sideBar = document.querySelector(".sideBar");

  sideBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const projectCard = e.target.closest(".projectCard");

      let myProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const modifiedData = myProjects.filter(
        (p) => p.id !== projectCard.dataset.id
      );

      console.log(modifiedData);

      localStorage.setItem("projects", JSON.stringify(modifiedData));

      projectCard.remove();
    }

    if (e.target.classList.contains("editBtn")) {
      const projectCard = e.target.closest(".projectCard");

      editProject(projectCard);
    }
  });
};
export { loadForm, setupProjectCard };
