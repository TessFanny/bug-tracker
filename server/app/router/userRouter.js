const express = require('express');
const userRouter =  express.Router();
const security = require('../services/security')

module.exports = userRouter; 

// import express from 'express';
// import auth from '../service/security.js';
// import controller from '../controllers/index.js';
// import validation from '../service/validation.js';
// import schemaUser from '../schemas/userBody.js';
// import schemaHasTag from '../schemas/hasTagBody.js';

// const router = express.Router();

// // Routes des membres
// router.get('/users', auth.authMiddleware(['staff', 'admin']), controller.usersController.getAll);
// router.get('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.getUser);
// router.patch('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaUser.update(),"body"), controller.usersController.updateUser);
// router.delete('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.deleteUser);

// // Routes admin/staff
// router.get('/admin/user/:id', auth.authMiddleware(['staff', 'admin']), controller.usersController.adminGetUser);
// router.patch('/admin/user/:id', auth.authMiddleware(['admin']), validation.check(schemaUser.updateAdmin(),"body"), controller.usersController.adminUpdateUser);
// router.delete('/admin/user/:id', auth.authMiddleware(['admin']), controller.usersController.adminDeleteUser);

// // Routes de la relation USER_HAS_TAG
// router.get('/user/:id/tag', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.getUserTags);
// router.post('/user/:id/tag', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaHasTag.addTag(),"body"), controller.usersController.addUserTag);
// router.delete('/user/:id/tag/:tagId', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.deleteUserTag);

// // Route du matching de tous les animaux
// router.get('/user/:id/matching', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.matching);

// // Route du matching d'un animal
// router.get('/user/:id/matching/:animalId', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.matchingOne);

// export default router;