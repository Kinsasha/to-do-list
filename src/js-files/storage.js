import { getProjects, setProjects, currentState } from "./todo";

// localStorage.clear();
const storeDefaultProject = () => {
  const projects = currentState.projects;

  const existingProject = projects.find((p) => p.id === `No.1`);

  const defaultData = {
    title: `DEFAULT`,
    id: `No.1`,
    todos: existingProject?.todos ?? [],
  };
  if (!existingProject) {
    projects.push(defaultData);
    setProjects(projects);
  }
};

const storeProjectCard = (projectData) => {
  let projects = getProjects();

  projects.push(projectData);
  setProjects(projects);
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
const storeEditedTodo = (projectID, todoID, editedData) => {
  const updatedprojects = getProjects().map((project) => {
    project.id === projectID;

    return {
      ...project,
      todos: project.todos.map((todo) => {
        if (todo.todoId === todoID) {
          return { ...todo, ...editedData };
        } else {
          return todo;
        }
      }),
    };
  });
  console.log(updatedprojects);

  setProjects(updatedprojects);
};
export {
  storeProjectCard,
  storeDefaultProject,
  storeTodoData,
  getTodosForProject,
  storeEditedTodo,
};
