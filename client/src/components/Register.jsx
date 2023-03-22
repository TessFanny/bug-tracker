import { useState, useRef, useEffect } from "react";
import css from "../index.css?inline";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from '../api/axios'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// le mot de passe doit avoir au min une maj, une minuscule, un caractère spécial, un chiffre et doit etre compris entre 8 et 24 caractères
const PWD_REGEX = /(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register'

const Register = () => {
 
  const [email, setEmail] = useState("");

  const [validEmail, setValidEmail] = useState(false);

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstname, lastname, email, password
    }
    // to prevent js hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("invalid entry");
      return;
    }
    try {
      
      const response = await axios.post(REGISTER_URL,
      JSON.stringify({ 
        firstname : firstname, 
        lastname: lastname, 
        email: email, 
        password: pwd,
        passwordConfirm: matchPwd       
      }),
      { 
        headers: { "Content-Type" : 'application/json'},
        // withCredentials: true,
      }
      );
      console.log('testing');
      console.log(response.data);
      console.log(response.token);
      console.log(JSON.stringify(response));
      setSuccess(true)
      // clear input fiels 
      setFirstname('');
      setLastname('');
      setEmail('');
      setPwd('');
      setMatchPwd('');

    } catch (error) {
      console.log(error);
      if(!error?.response){
        setErrMsg('no server response')
      }else if (error.reponse?.status === 409){
        setErrMsg('Email taken')
      }else{
        setErrMsg('registration failed')
      }
      
    }
   
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            {/* react router */}
            <a href="#"> Sign In</a>
          </p>
        </section>
      ) : (
        
          <div className=" flex flex-col w-10/12 bg-white rounded-xl overflow-hidden md:flex-row">
            <div className=" md:w-1/2 bg-violet-400 flex justify-center items-center flex-col px-3">
              <h2 className=" text-3xl py-5 text-[#011b5e] font-bold">
                {" "}
                welcome
              </h2>
              <div>
                <p className=" text-white py-5 px-5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  quod ratione incidunt nihil sint voluptatibus. Illum, nobis,
                  cumque iusto maiores perspiciatis tempora ratione{" "}
                </p>
              </div>
            </div>
            <div className=" md:w-1/2  flex flex-col py-3 md:py-10 md:px-7">
              <p  className={errMsg ? "errmsg" : "offscreen"}>
                {errMsg}
              </p>
              <h2 className="mb-4 text-3xl text-center text-[#011b5e] font-bold">
                Register
              </h2>

              <p className="mb-4 text-center text-[#011b5e]">
                create your account.
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className=" grid lg:grid-cols-2  ">
                  <div className=" flex flex-col px-5">
                    <label htmlFor="firstname" className="py-2 text-[#011b5e]">
                      Firstname:
                    </label>
                    <input
                      className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
                      id="firstname"
                      type="text"
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </div>
                  <div className=" flex flex-col px-5">
                    <label htmlFor="lastname" className="py-2 text-[#011b5e]">
                      Lastname:
                    </label>
                    <input
                      className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
                      id="lastname"
                      type="text"
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className=" mt-1 flex flex-col px-5 ">
                  <label htmlFor="email" className="py-2 text-[#011b5e] flex">
                    Email:
                    <span className={validEmail ? "valid" : "hide"}>
                      <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FaTimesCircle className="ml-2 mt-1 text-red-500" />
                    </span>
                  </label>
                  <input
                    className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
                    autoComplete="off"
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    aria-invalid={validEmail ? "false" : "true"}
                  />
                  <p
                    id="uidnote"
                    className={
                      email && !validEmail ? "instructions" : "offscreen"
                    }
                  >
                    <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
                    4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    accepts letters, numbers
                  </p>
                </div>
                <div className=" mt-1 flex flex-col px-5 ">
                  <label
                    htmlFor="password"
                    className="py-2 text-[#011b5e] flex"
                  >
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                      <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                      <FaTimesCircle className="ml-2 mt-1 text-red-500" />
                    </span>
                  </label>
                  <input
                    className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
                    id="password"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-describedby="pwdnote"
                    aria-invalid={validPwd ? "false" : "true"}
                  />
                  <p
                    id="pwdnote"
                    className={pwd && !validPwd ? "instructions" : "offscreen"}
                  >
                    <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and
                    special character <br />
                    Allow special characters: !@#$
                  </p>
                </div>
                <div className=" mt-1 flex flex-col px-5 ">
                  <label
                    htmlFor="passwordConfirm"
                    className="py-2 text-[#011b5e] flex"
                  >
                    Confirm password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
                    </span>
                    <span
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    >
                      <FaTimesCircle className="ml-2 mt-1 text-red-500" />
                    </span>
                  </label>
                  <input
                    className=" border-2 border-x-gray-400 py-1 px-2 rounded-md"
                    id="passwordConfirm"
                    type="password"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-describedby="confirnnote"
                    aria-invalid={validMatch && matchPwd ? "false" : "true"}
                    onFocus={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirnnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
                    must match the password input field
                  </p>
                </div>
                <button
                  disabled={
                    !validEmail || !validPwd || !validMatch ? true : false
                  }
                  className=" bg-[#011b5e] shadow-blue-900 self-center text-gray-100 w-[10rem] rounded-lg p-2 mt-4 cursor-pointer hover:scale-105 ease-in duration-200"
                >
                  Sign Up
                </button>
              </form>
              <p className=" text-xs my-4 mx-4">
                Already registered? <br />
                <span>
                  {/* put router link here */}
                  <a href="#" className=" text-sm text-[#011b5e] font-bold">
                    Sign In
                  </a>
                </span>
              </p>
            </div>
          </div>
        
      )}
    </>
  );
};

export default Register;
