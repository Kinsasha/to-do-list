import { getProjects, setProjects, currentState } from "./todo";

// localStorage.clear();
const storeDefaultProject = () => {
  const projects = currentState.projects;

  const existingProject = currentState.projects.find((p) => p.id === `No.1`);

  const defaultData = {
    title: `DEFAULT`,
    id: `No.1`,
    todos: existingProject?.todos ?? [],
  };
  if (!existingProject) {
    currentState.projects.push(defaultData);
    setProjects(currentState.projects);
  }
};

const storeProjectCard = (projectData) => {
  // let project = getProjects();

  currentState.projects.push(projectData);
  setProjects(currentState.projects);
};
const storeTodoData = (todoData) => {
  const project = getProjects();
  const newTodo = project.find((p) => p.id === todoData.id);
  if (newTodo) newTodo.todos.push(todoData);
  setProjects(project);
};

const getTodosForProject = (id) => {
  // console.log(id);
  const project = getProjects();
  const todos = project.find((p) => p.id === id);
  if (todos) return todos.todos;
};
export {
  storeProjectCard,
  storeDefaultProject,
  storeTodoData,
  getTodosForProject,
};
