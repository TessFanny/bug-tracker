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
      const userModel = new User();
      const user = userModel.findByPk(req.params.user_id);

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
};
export default userController;
