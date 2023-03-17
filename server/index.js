
 require('dotenv').config();
 const cors = require('cors')
const express = require('express');
const session = require('express-session')
const {
    authRouter,
    userRouter,
    bugRouter,
    commentRouter,
    projectRouter,
    roleRouter,
    permissionRouter
} = require("./app/router");
const errorService = require('./app/services/errorHandling')

const port = process.env.PORT || `port number`;

const app = express();


/* Configuration des sessions */
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: (1000*60*60)
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
const expressJSDocSwagger = require("express-jsdoc-swagger");

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
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

// REDIRECTION ROUTER

app.use(errorService.manage);  

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", bugRouter);
app.use("/api", commentRouter);
app.use("/api", projectRouter);
app.use("/api", roleRouter);
app.use("/api", permissionRouter);


app.listen(port, () => {
    console.log(`Server ready: http://localhost:${port}`);
});



