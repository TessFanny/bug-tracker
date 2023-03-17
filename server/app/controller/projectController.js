const datamapper = require("../datamapper");

const projectController = {
 getHomepage: (req,res)=>{
    res.send("Welcome to bug tracker API");
 }, 
 getProjects: async(req,res)=>{
    const projects = await datamapper.getAllProjects()
    res.json(projects)
 }
}

module.exports = projectController     