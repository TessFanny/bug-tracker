import React from "react";
import { Link } from "react-router-dom";
const LinkPage = () => {
  return (
    <div>
      <h1 className=" text-3xl text-white">links</h1>
      <h2 className=" text-3xl text-white">public</h2>
      <li className=" flex flex-col">
        <Link to="/login">Login </Link>
        <Link to="/register">register</Link>
      </li>
      <h2 className=" text-3xl text-white">private</h2>
      <li className=" flex flex-col">
        <Link to="/admin">Admin </Link>
        <Link to="/">Home</Link>
        <Link to="/project">Project</Link>
      </li>
    </div>
  );
};

export default LinkPage;
