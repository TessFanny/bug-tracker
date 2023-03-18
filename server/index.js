
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express'
import session from 'express-session'

import index from "./app/router/index.js";

import errorService  from './app/services/errorHandling.js';

const port = process.env.PORT || `port number`;

const app = express();


/* Configuration des sessions */
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		//maxAge: (1000*60*60*3600)
	},
};

/* Mise en place des sessions */
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// SWAGGER
import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: "1.0.0",
    title: "Bug Tracker",
    description: "My API with Swagger documentation",
    license: {
      name: "MIT",
    },
  },
  //Chemin de la doc
  //swaggerUIPath: "/devboard",
  // security: {
  //   basic: {
  //     type: "http",
  //     scheme: "basic",
  //     bearerFormat: "JWT "
  //   }
  // },
  security: {
    TokenAuth : {
      type: 'http',
      scheme: 'bearer'
    }
  },
  baseDir: new URL('.', import.meta.url).pathname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

// REDIRECTION ROUTER

app.use(errorService.manage);  

app.use("/api", index.userRouter);
app.use("/api", index.authRouter);
app.use("/api", index.bugRouter);
app.use("/api", index.commentRouter);
app.use("/api", index.projectRouter);
app.use("/api", index.roleRouter);

app.use('/api', (req, res)=>{
  res.json('homePage')
})

app.listen(port, () => {
    console.log(`Server ready: http://localhost:${port}`);
});



