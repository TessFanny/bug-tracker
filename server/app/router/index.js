const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const bugRouter = require("./bugRouter");
const commentRouter = require("./commentRouter");
const projectRouter = require("./projectRouter");
const roleRouter = require("./roleRouter");
const permissionRouter = require("./permissionRouter");

module.exports = {
    authRouter,
    userRouter,
    bugRouter,
    commentRouter,
    projectRouter,
    roleRouter,
    permissionRouter
}