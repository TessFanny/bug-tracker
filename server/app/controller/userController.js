import User from"../models/userModel.js";

const userController = {
getAllUsers : async (req,res)=>{
   
    const users = await User.findAll(req.body)
    //console.log(users);
    if(users){
        res.status(200).json(users)
    } else{
        res.status(400).json('cannot find ressources')
    }
}

}
export default userController; 