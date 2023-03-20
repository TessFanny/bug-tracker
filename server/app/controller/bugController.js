import Bug from "../models/bugModel.js";

const bugController = {
  getAllBugs: async(req, res, next)=>{
    try {        
        const bugs = await Bug.findAll();
        if(!bugs){
            res.status(404).json('no resources found')
        }else{
            res.status(200).json(bugs)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
  }, 
  getOneBug : async (req, res, next)=>{
    try {
        const bugModel = new Bug(req.body)
        const bug = await bugModel.findByPk(req.params.bug_id)
        if(!bug){
            res.status(404).json('no bug found')
        }else{
            res.status(200).json(bug)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
  },
  createBug: async(req, res, next)=>{
     try {
        const bugModel = new Bug(req.body)
        const bug = await bugModel.create(req.body)
        if(bug){
            res.status(200).json(bug)
        }else{
            res.status(400).json('failed to create a bug')
        }
     } catch (error) {
        console.error(error)
        next(error)
     }
  },

  updateBug: async(req,res, next)=>{
    try {
        const bugModel = new Bug(req.body)
        const bug = bugModel.findByPk(req.params.bug_id)
    if(bug){
        const updatedBug = await bugModel.update(req.params.bug_id, req.body)
        console.log(updatedBug);
        res.status(200).json(updatedBug)
      }else{
       res.status(400).json(`the user you are trying to update doesn't exists`)
      }
    } catch (error) {
        console.error(error)
        next(error)
    }
    
  },
  deleteBug: async(req,res, next)=>{
    try {
        const bugModel = new Bug(req.body)
        const bug = bugModel.findByPk(req.params.bug_id)
    if(bug){
        const deletedBug = await bugModel.delete(req.params.bug_id)
        console.log(deletedBug);
        res.status(200).json(deletedBug)
      }else{
       res.status(400).json(`the user you are trying to delete doesn't exists`)
      }
    } catch (error) {
        console.error(error)
        next(error)
    }
    
  },

}

export default bugController;