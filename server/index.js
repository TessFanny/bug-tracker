import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import {userRouter,
  authRouter,
  ticketRouter,
  commentRouter,
  projectRouter,
  roleRouter} from "./app/router/index.js";

import errorService from "./app/services/errorHandling.js";


const port = process.env.PORT || `port number`;
const app = express();


app.use(cors({
  origin: ['http://127.0.0.1:5173'],
  credentials: true
}));
app.use(cookieParser())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
 // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
;

/* Configuration des sessions */
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    maxAge: (24 * 60 * 60 * 1000)
  },
};

/* Mise en place des sessions */
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SWAGGER
import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: "1.0.0",
    title: "ticket Tracker",
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
    TokenAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
  baseDir: new URL(".", import.meta.url).pathname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

// REDIRECTION ROUTER

app.use(errorService.manage);

app.use(
  "/api",
  userRouter,
  authRouter,
  ticketRouter,
  commentRouter,
  projectRouter,
  roleRouter
);

// app.get("/api", (req, res) => {
//   res.json("homePage");
// });

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
