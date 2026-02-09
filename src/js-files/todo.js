const getProjects = () => {
  return JSON.parse(localStorage.getItem("projects")) || [];
};
const setProjects = (data) => {
  return localStorage.setItem("projects", JSON.stringify(data));
};

let currentState = { projects: getProjects(), selectedProjectID: null };

const setCurrentProject = (id) => {
  currentState.selectedProjectID = id;
  // console.log("Current project is now:", currentState.selectedProjectID);
};
const getCurrentProject = () => {
  return currentState.selectedProjectID;
};

const deleteTodoFromStorage = (projectID, todoID) => {
  console.log(projectID);
  const projects = getProjects();
  const updatedProject = projects.map((project) => {
    if (project.id !== projectID) return project;

    return {
      ...project,
      todos: project.todos.filter((todo) => todo.todoId !== todoID),
    };
  });
  setProjects(updatedProject);
};
export {
  getProjects,
  setProjects,
  currentState,
  setCurrentProject,
  getCurrentProject,
  deleteTodoFromStorage,
};
