import "./styles.css";
import { loadDefaultDOM, loadProjectForm, loadSavedCards } from "./js-files/ui";
import { loadForm, setupProjectCard } from "./js-files/events";
import { handleForm } from "./js-files/render";

const init = () => {
  const { addProjectBtn } = loadDefaultDOM();
  loadSavedCards();
  loadForm(addProjectBtn);
  setupProjectCard();
};

init();
