import jwt from 'jsonwebtoken';

const securityService = {
    /**
     * Vérification pour voir si l'utilisateur est connecté
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isConnected(req, res, next) {
        console.log(req.session.user);
        if (!req.session.user) {
            // user est absent, je redirige vers la homepage
            console.log('not user in session');
            res.redirect("/api");
            
        }
        else {
            // user est présent, je continue mon chemin
            next();
        }
    },
    
    checkToken(req, res, next) {
        try {
            //console.log(req.headers.authorization.split(" ")[1]);
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SESSION_SECRET);
            console.log("token validé !", user);
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
};

export default securityService;

// import jwt from 'jsonwebtoken';
// import { User, Role } from '../models/index.js';

// const securityService = {

//     authMiddleware(roles) {

//         return async function(req, res, next) {
                
//           try {
//             // RÃ©cupÃ©rer le token JWT depuis l'en-tÃªte Authorization
//             const token = req.headers.authorization.split(" ")[1];

//             // VÃ©rifier si le token est valide
//             const userToken = jwt.verify(token, process.env.SESSION_SECRET);

//             // RÃ©cupÃ¨re le role liÃ© Ã  l'utilisateur
//             const userEmail = userToken.email;
//             const user = await User.findAll({ $where: {email:userEmail} });
//             const userRole = await Role.findAll({ $where: {id:user[0].role_id} });
                  
//             req.userProfil = user;    // je stocke le profil utilisateur
//             req.user = userRole[0];   // je stocke le profil role utilisateur

//             console.log("token validÃ© !", userToken, "Role : ", req.user.name);
            
//           } catch(err) {
//             return res.status(401).json({ message: 'Token invalide' });
//           }
      
//           // VÃ©rifier si l'utilisateur a le rÃ´le requis pour accÃ©der Ã  la route
//           // console.log("rÃ©sultat roles : ", roles.indexOf(req.user.name));
//           if (roles.indexOf(req.user.name) === -1) {                                // Si le nom est prÃ©sent renvoie son index dans le tableau (entier positif ou nul)
//             return res.status(403).json({ message: "Vous n'Ãªtes pas autorisÃ©" });   // Si le nom n'est pas trouvÃ© renvoie -1
//           }
      
//           // L'utilisateur est authentifiÃ© et autorisÃ©, passer au middleware suivant
//           next();
//         }
//       },

//       async checkToken(req, res) {
//         // VÃ©rification du Token
//         try {
//             // RÃ©cupÃ©rer le token JWT depuis l'en-tÃªte Authorization
//             const token = req.headers.authorization.split(" ")[1];                //On rÃ©cupÃ¨re la 2eme parties (sÃ©paration du type Bearer) pour garder l'Ã©lÃ©ment indice [1] (le code token)
//             // VÃ©rifier si le token est valide
//             const userToken = jwt.verify(token, process.env.SESSION_SECRET);

//             const user = await User.findAll({ $where: {email:userToken.email} });
//             res.json({ user, message: 'Token valide' });
//         } catch(error) {
//             return res.status(403).json({ message: 'Token invalide' });
//         }
//       },
// };

// export default securityService;