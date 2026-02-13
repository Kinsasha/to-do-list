let currentState = { projects: getProjects(), selectedProjectID: null };

function getProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}
const setProjects = (data) => {
  return localStorage.setItem("projects", JSON.stringify(data));
};

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

const toggleTodo = (projectID, todoID, isCompleted) => {
  const projects = getProjects();

  // Find the project
  const project = projects.find((p) => p.id === projectID);

  if (!project) {
    console.error("Project not found");
    return;
  }

  // Find the todo within that project
  const todo = project.todos.find((t) => t.todoId === todoID);

  console.log(todoID);
  console.log(todo);

  if (!todo) {
    console.error("Todo not found");
    return;
  }

  // Update the todo's completion status
  todo.isCompleted = isCompleted;

  // Save back to storage
  setProjects(projects);
};
export {
  getProjects,
  setProjects,
  currentState,
  setCurrentProject,
  getCurrentProject,
  deleteTodoFromStorage,
  toggleTodo,
};
