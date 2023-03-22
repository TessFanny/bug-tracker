import { useState, useRef, useEffect, useContext } from "react";
import css from "../index.css?inline";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      console.log("testing");
      console.log(response.data);
      console.log(response.data.token);
      console.log(JSON.stringify(response?.data));
      const token = response?.data?.token;
      const role = response?.data?.role;
      const firstname = response?.data?.firstname;
      const lastname = response?.data?.lastname;
      setAuth({firstname, lastname, email, pwd, role, token})
      // clear input fiels
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrMsg("no server response");
      } else if (error?.response?.status === 400) {
        setErrMsg(" wrong email or password");
      }else if (error?.response?.status === 401) {
        setErrMsg("Unauthorized");
      }
       else {
        setErrMsg("login failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in! </h1>
          <p>
            {/* react router */}
            <a href="#"> Go to home</a>
          </p>
        </section>
      ) : (
        <div className=" flex flex-col w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden md:flex-row">
          <div className=" md:w-1/2 bg-violet-400 flex justify-center items-center flex-col px-3">
            <h2 className=" text-3xl py-5 text-[#011b5e]"> welcome</h2>
            <div>
              <p className=" text-white py-5 px-5">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                quod ratione incidunt nihil sint voluptatibus. Illum, nobis,
                cumque iusto maiores perspiciatis tempora ratione{" "}
              </p>
            </div>
          </div>
          <div className=" md:w-1/2  flex flex-col py-3 md:py-10 md:px-7">
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
                  className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
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
                  className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
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
                <a href="#" className=" text-sm text-[#011b5e] font-bold">
                  Sign Up
                </a>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
