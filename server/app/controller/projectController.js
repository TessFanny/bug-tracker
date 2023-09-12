import Project from "../models/projectModel.js";

const projectController = {
  getAllProjects: async (req, res, next) => {
    try {
      const projectModel = new Project(req.body);
      const projects = await projectModel.getProjects();
      if (!projects) {
        res.status(404).json("no resources found");
      } else {
        res.status(200).json(projects);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getOneProject: async (req, res, next) => {
    try {
      const projectModel = new Project(req.body);
      const project = await projectModel.findByPk(req.params.project_id);
      if (!project) {
        res.status(404).json("no project found");
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getAllUsersOnProject: async (req, res, next) => {
    try {
      const projectModel = new Project(req.body);
      const contributors = await projectModel.getUsersOnProject(
        +req.params.project_id
      );
      if (!contributors) {
        res.status(404).json("no user found in this project");
      } else {
        res.status(200).json(contributors);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getProjectsUserIsAssignedTo : async (req, res, next)=>{
    try {
      const projectModel = new Project(req.body);
      const projects = await projectModel.getProjectsUserIsAssignedToModel(req.params.user_id);
      if (!projects) {
        res.status(404).json("no resources found");
      } else {
        res.status(200).json(projects);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  createProject: async (req, res, next) => {
    try {
      const projectModel = new Project(req.body);
      const project = await projectModel.create(req.body);
      if (project) {
        res.status(200).json(project);
        console.log(project);
      } else {
        res.status(400).json("failed to create a project");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  assignUserToProject: async (req, res, next) => {
    try {
      const { user_id} = req.body
      const { project_id} = req.params
      const projectModel = new Project(req.body);
     
      const verifyProject = await projectModel.getUserProject(project_id, user_id)

      if(verifyProject){
        res.status(409).json(`user  already assigned to the project `)
      } else{
        const projectAdded = await projectModel.assignUsertoProjectModel(
          user_id,
          project_id
        );
        if (projectAdded) {
          res
            .status(201)
            .json({
              msg: `User ${req.body.user_id} assigned to ${req.params.project_id} succesfully`,
            });
        } else {
          res.status(400).json("failed to create a project");
        }
      }
            
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
 
  updateProject: async (req, res, next) => {
    try {
      const projectModel = new Project(req.body);
      const project = await  projectModel.findByPk(req.params.project_id);
      if (project) {
        const updatedProject = await projectModel.update(
          req.params.project_id,
          req.body
        );
        console.log(updatedProject);
        res.status(200).json(updatedProject);
      } else {
        res
          .status(400)
          .json(`the user you are trying to update doesn't exists`);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteProject: async (req, res, next) => {
    try {
      const projectModel = new Project(req.body);
      const project = await  projectModel.findByPk(req.params.project_id);
      if (project) {
        const deletedProject = await projectModel.deleteProjectModel(req.params.project_id)
        console.log(deletedProject);
        res.status(200).json(deletedProject);
      } else {
        res
          .status(400)
          .json(`the user you are trying to delete doesn't exists`);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default projectController;
