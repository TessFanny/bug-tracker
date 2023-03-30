import { useState, useRef, useEffect } from "react";
import css from "../index.css?inline";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/login";

const Login = () => {
  axios.defaults.withCredentials = true;
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/layout/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //console.log(response.data);
      //console.log(JSON.stringify(response?.data));
      const token = response?.data?.token;
      const role = response?.data?.loggedUser?.role;
      const firstname = response?.data?.loggedUser?.firstname;
      const lastname = response?.data?.loggedUser?.lastname;

      setAuth({ firstname, lastname, email, pwd, role, token });
      // clear input fiels
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
      // Store the received token in local storage
      localStorage.setItem("token", token);
      return { auth };
    } catch (error) {
      console.log(error);

      if (!error?.response) {
        setErrMsg("no server response");
      } else if (error?.response?.status === 400) {
        setErrMsg(" wrong email or password");
      } else if (error?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("login failed");
      }
    }
  };

  return (
    <main className=" mt-10 flex justify-center items-center">
      <div className="  max-w-[500px] flex flex-col w-10/12 bg-slate-300 rounded-xl mx-auto shadow-xl overflow-hidden">
      {/* <div className=" md:w-1/2 bg-violet-400 flex justify-center items-center flex-col px-3">
        <h2 className=" text-3xl py-5 text-[#011b5e]"> Bug Tracker</h2>
        <div>
          <p className=" text-white py-5 px-5">
          Application de gestion des erreurs qui peuvent survenir pendant la réalisation des projets; Connectez vous ou créer un compte pour commencer
          </p>
        </div>
      </div> */}
      <div className="flex flex-col py-3 md:py-10 md:px-7">
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <h2 className="mb-4 text-3xl text-center text-[#011b5e]">Login</h2>
        <p className="mb-4 text-center text-[#011b5e]">
          {" "}
          Log in into your account.
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className=" mt-1 flex flex-col px-5 ">
            <label htmlFor="email" className="py-2 text-[#011b5e]">
              Email:
            </label>
            <input
              className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className=" mt-1 flex flex-col px-5 ">
            <label htmlFor="password" className="py-2 text-[#011b5e]">
              Password:
            </label>
            <input
              className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
          </div>

          <button className=" bg-[#011b5e] self-center text-gray-100 w-[10rem] rounded-lg p-2 mt-4">
            Sign In
          </button>
        </form>
        <p className=" text-xs my-4 mx-4">
          Need an Account? <br />
          <span>
            {/* put router link here */}
            <Link to='/register' className=" text-sm text-[#011b5e] font-bold">Sign Up</Link>
          
          </span>
        </p>
      </div>
    </div>
    </main>
    
  );
};

export default Login;
