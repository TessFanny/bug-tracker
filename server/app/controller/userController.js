import User from "../models/userModel.js";

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll(req.body);
      //console.log(users);
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(400).json("cannot find ressources");
      }
    } catch (error) {
      next(error);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const userModel = new User(req.body);
      const user = await userModel.findByPk(req.params.user_id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json("cannot find user");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateUser: async (req,res, next)=>{
    try {
      // crée l'instance d'un utilisateur
      const userModel = new User(req.body);
      // je cherche l'utilisateur avec l'email modifié
      const userByEmail = await userModel.findByField("email", req.body.email);
     // je vérifie s'il n'y a pas déjà un utilisateur avec cet email si oui j'envoie un message d'erreur
      if(userByEmail && userByEmail.id != req.params.user_id){
         return res.status(409).json({ error: 'Email address already in use' });         
      }
// si l'email n'existe pas déjà je mets à jour les données de l'utilisateur
      const updatedUser = await userModel.update(req.params.user_id, req.body)
     
      if(!updatedUser){
        // je renvoie un message d'erreur si l'utilisateur n'est pas trouvé
        res.status(400).json('updating user failed')
      }else{
        // sinon je renvoie les nouvelles données de l'utilisateur
        res.status(200).json(updatedUser);
      }
      
    } catch (error) {
      console.error(error);
      next(error);
    }
  
  },
   deleteUser: async(req, res, next)=>{
    try {
       // crée l'instance d'un utilisateur
       const userModel = new User(req.body);
       // verifie si l'utilisateur existe
       const user = await userModel.findByPk(req.params.user_id);
       console.log(user);
       // si oui, je le supprime
       if(user){
         const deletedUser = await userModel.delete(req.params.user_id)
         console.log(deletedUser);
         res.status(200).json(deletedUser)
       }else{
        res.status(400).json(`the user you are trying to delete doesn't exists`)
       }
    } catch (error) {
      console.error(error);
      next(error);
    }
   }
};
export default userController;
