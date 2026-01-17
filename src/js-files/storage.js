// localStorage.clear();
const storeProjectCard = (projectData) => {
  let myProjects = JSON.parse(localStorage.getItem("projects")) || [];

  myProjects.push(projectData);

  console.log(myProjects);

  localStorage.setItem("projects", JSON.stringify(myProjects));
};

export { storeProjectCard };
