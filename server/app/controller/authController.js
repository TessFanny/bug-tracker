import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import debug from "debug";
const log = debug("controller:authController");

 import dotenv from 'dotenv';
 dotenv.config();

const authController = {
  /**
   * permet de s'enregistrer
   * @param {*} req
   * @param {*} res
   */
  register: async (req, res, next) => {
    try {
      // je vérifie si l'email existe déjà en bdd
      const user = new User(req.body);
      if (await user.checkEmail()) {
        console.log(user);
        res.status(400).json("cet email existe déjà");
      }

      // verify if the password and the password confirmation are the same
      if (req.body.password !== req.body.passwordConfirm)
        return res
          .status(400)
          .json("les mots de passe  ne correspondent pas" );

      const salt = await bcrypt.genSalt(10);
      // password hashing
      const hashedPassword = await bcrypt.hash(user.password, salt);
      // generate an instance of User class
      const savedUser = await user.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });

      const token = jwt.sign({ email: savedUser.email }, process.env.SESSION_SECRET, { expiresIn: "3600s"});
      // const refreshToken = jwt.sign({ id: savedUser.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d"});

      
      // delete password before sending it
      delete savedUser.password;
      res.status(201).json({ token, savedUser});
    } catch (error) {
      console.error(`Error in register() : ${error.message}`);
      log(error);
      next(error);
    }
  },

  /** authentification
   *
   * @param {*} req
   * @param {*} res
   */
  login: async (req, res, next) => {
    try {
      // on génère une instance de User à partir de req.body qui contient username et password
      const userModel = new User(req.body);
      // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
      // la méthode renvoie true ou false suivant si les informations username/password sont correctes
      console.log(userModel);
      if (await userModel.checkEmailLogin(req.body.email, req.body.password)) {
        // generation du token
        const token = jwt.sign({ 
          email: userModel.email 
      }, 
          process.env.SESSION_SECRET
  );
     
          // on enregistre le user courant dans la session
          const loggedUser = await userModel.findByField("email", userModel.email);
                 
        req.user = loggedUser;
        console.log(req.user);
      
        delete loggedUser.password;
      
        // on envoie le token généré au client
      
        res.status(200).json({
          token,
          loggedUser
        });
      } else {
        // erreur dans le couple email/password, on renvoie false au client
        res.status(400).json({ msg: "email ou le mot de passe ne correspond pas" });
      }
    } catch (error) {
      console.error(`Error in login() : ${error.message}`);
      log(error);
      next(error);
    }
  },
};

export default authController;
