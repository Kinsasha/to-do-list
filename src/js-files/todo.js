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
export {
  getProjects,
  setProjects,
  currentState,
  setCurrentProject,
  getCurrentProject,
};
