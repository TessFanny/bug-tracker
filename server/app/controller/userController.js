const datamapper = require("../datamapper");

const userController = {
getAllUsers : async (req,res)=>{
    const users = await datamapper.getUsers()
    res.json(users)
}

}
module.exports = userController; 