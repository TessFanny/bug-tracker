import Comment from "../models/commentModel.js";

const commentController = {
  getTicketComments: async(req, res, next)=>{
    try {        
        const commentModel = new Comment(req.body)
        const comments = await commentModel.getTicketCommentsModel(req.params.ticket_id);
        if(!comments){
            res.status(404).json('no resources found')
        }else{
            res.status(200).json(comments)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
  }, 
  getOneComment : async (req, res, next)=>{
    try {
        const commentModel = new Comment(req.body)
        const comment = await commentModel.findByPk(req.params.comment_id)
        if(!comment){
            res.status(404).json('no comment found')
        }else{
            res.status(200).json(comment)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
  },
  createComment: async(req, res, next)=>{
     try {
        const commentModel = new Comment(req.body)
        const comment = await commentModel.create(req.body)
        if(comment){
            res.status(200).json(comment)
        }else{
            res.status(400).json('failed to create a comment')
        }
     } catch (error) {
        console.error(error)
        next(error)
     }
  },

  updateComment: async(req,res, next)=>{
    try {
        const commentModel = new Comment(req.body)
        const comment = commentModel.findByPk(req.params.comment_id)
    if(comment){
        const updatedComment = await commentModel.update(req.params.comment_id, req.body)
        res.status(200).json(updatedComment)
      }else{
       res.status(400).json(`the user you are trying to update doesn't exists`)
      }
    } catch (error) {
        console.error(error)
        next(error)
    }
    
  },
  deleteComment: async(req,res, next)=>{
    try {
        const commentModel = new Comment(req.body)
        const comment = commentModel.findByPk(req.params.comment_id)
    if(comment){
        const deletedComment = await commentModel.delete(req.params.comment_id)
        console.log(deletedComment);
        res.status(200).json(deletedComment)
      }else{
       res.status(400).json(`the comment you are trying to delete doesn't exists`)
      }
    } catch (error) {
        console.error(error)
        next(error)
    }
    
  },

}

export default commentController;