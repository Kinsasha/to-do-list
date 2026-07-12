let currentState = { projects: getProjects(), selectedProjectID: null };

function getProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}
const setProjects = (data) => {
  return localStorage.setItem("projects", JSON.stringify(data));
};

const setCurrentProject = (id) => {
  currentState.selectedProjectID = id;
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

const toggleTodo = (projectID, todoID, isCompleted) => {
  const projects = getProjects();

  const project = projects.find((p) => p.id === projectID);

  if (!project) {
    console.error("Project not found");
    return;
  }

  const todo = project.todos.find((t) => t.todoId === todoID);

  if (!todo) {
    console.error("Todo not found");
    return;
  }

  todo.isCompleted = isCompleted;

  setProjects(projects);
};

const handleSideBarState = () => {
  const sideBar = document.querySelector(".sideBar");
  const sideBarClass = localStorage.getItem("sideBarState");

  sideBarClass === "true"
    ? sideBar.classList.add("collapsed")
    : sideBar.classList.remove("collapsed");
};
export {
  getProjects,
  setProjects,
  currentState,
  setCurrentProject,
  getCurrentProject,
  deleteTodoFromStorage,
  toggleTodo,
  handleSideBarState,
};
