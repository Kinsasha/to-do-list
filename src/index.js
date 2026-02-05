import "./styles.css";
import { loadDefaultDOM, loadProjectForm, loadSavedCards } from "./js-files/ui";
import {
  loadForm,
  setupProjectCard,
  todoEvent,
  selectCards,
} from "./js-files/events";
import { handleForm } from "./js-files/render";
import { storeDefaultProject } from "./js-files/storage";

const init = () => {
  const { addProjectBtn } = loadDefaultDOM();
  loadSavedCards();
  selectCards();
  loadForm(addProjectBtn);
  todoEvent();
  setupProjectCard();
};

init();
