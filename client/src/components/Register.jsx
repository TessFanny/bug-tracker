// import { useState, useRef, useEffect } from "react";
// import css from "../index.css?inline";
// import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { registerUser } from "../features/user/userSlice";

// const EMAIL_REGEX =
//   /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// // le mot de passe doit avoir au min une maj, une minuscule, un caractère spécial, un chiffre et doit etre compris entre 8 et 24 caractères
// const password_REGEX = /(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// const REGISTER_URL = "/register";

// const Register = () => {
//   const { userRegistered, user } = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [email, setEmail] = useState("");

  
//   const [firstname, setFirstname] = useState("");
  
//   const [lastname, setLastname] = useState("");
  
//   const [password, setPassword] = useState("");
//   const [validPassword, setValidPassword] = useState(false);
//   const [validEmail, setValidEmail] = useState(false);

//   const [matchPassword, setMatchPassword] = useState("");
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [success, setSuccess] = useState(false);

//   const from = location?.state?.from?.pathname || "/";

//   useEffect(() => {
//     const result = EMAIL_REGEX.test(email);
//     console.log(result);
//     console.log(email);
//     setValidEmail(result);
//   }, [email]);

//   useEffect(() => {
//     const result = password_REGEX.test(password);
//     console.log(result);
//     console.log(password);
//     setValidPassword(result);
//     const match = password === matchPassword;
//     setValidMatch(match);
//   }, [password, matchPassword]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // to prevent js hack

//     try {
//       const v1 = EMAIL_REGEX.test(email);
//       const v2 = password_REGEX.test(password);
//       if (!v1 || !v2) {
//         toast.error("invalid entry");
//         return;
//       }
//       dispatch(
//         registerUser({
//           firstname,
//           lastname,
//           email,
//           password,
//           passwordConfirm: matchPassword,
//         })
//       );
      
//     } catch (error) {
//       console.log(error);
//       if (error.status == 400) {
//         toast("l'email ou le mot de passe ne correspont pas");
//       }
//     }
//   };

//   console.log("userRegistered in register : ", userRegistered);
//   useEffect(() => {
//     if (userRegistered) {
//       setEmail("");
//       setFirstname("");
//       setLastname("");
//       setPassword("");
//       setMatchPassword("");
//       setTimeout(() => {
//         navigate(from, { replace: true });
//       }, 1000);
//     }
//   }, [userRegistered]);

//   return (
//     <main className=" mt-10 flex justify-center items-center ">
//       <div className=" max-w-[500px] flex flex-col w-10/12 bg-slate-300 rounded-xl mx-auto shadow-xl overflow-hidden">
//         <div className=" flex flex-col py-3 px-7">
//           <h2 className="mb-4 text-3xl text-center text-[#011b5e] font-bold">
//             Register
//           </h2>

//           <p className="mb-4 text-center text-[#011b5e]">
//             create your account.
//           </p>
//           <form className="flex flex-col" onSubmit={handleSubmit}>
//             <div className=" flex flex-col px-5">
//               <label htmlFor="firstname" className="py-2 text-[#011b5e]">
//                 Firstname:
//               </label>
//               <input
//                 className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
//                 id="firstname"
//                 type="text"
//                 value={firstname}
//                 onChange={(e) => setFirstname(e.target.value)}
//                 required
//               />
//             </div>
//             <div className=" flex flex-col px-5">
//               <label htmlFor="lastname" className="py-2 text-[#011b5e]">
//                 Lastname:
//               </label>
//               <input
//                 className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
//                 id="lastname"
//                 type="text"
//                 value={lastname}
//                 onChange={(e) => setLastname(e.target.value)}
//                 required
//               />
//             </div>

//             <div className=" mt-1 flex flex-col px-5 ">
//               <label htmlFor="email" className="py-2 text-[#011b5e] flex">
//                 Email:
//                 <span className={validEmail ? "valid" : "hide"}>
//                   <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
//                 </span>
//                 <span className={validEmail || !email ? "hide" : "invalid"}>
//                   <FaTimesCircle className="ml-2 mt-1 text-red-500" />
//                 </span>
//               </label>
//               <input
//                 className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
//                 autoComplete="off"
//                 id="email"
//                 type="email"
                 
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 aria-describedby="uidnote"
//                 aria-invalid={validEmail ? "false" : "true"}
//               />
//               <p
//                 id="uidnote"
//                 className={email && !validEmail ? "instructions" : "offscreen"}
//               >
//                 <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
//                 4 to 24 characters. <br />
//                 Must begin with a letter. <br />
//                 accepts letters, numbers
//               </p>
//             </div>
//             <div className=" mt-1 flex flex-col px-5 ">
//               <label htmlFor="password" className="py-2 text-[#011b5e] flex">
//                 Password:
//                 <span className={validPassword ? "valid" : "hide"}>
//                   <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
//                 </span>
//                 <span
//                   className={validPassword || !password ? "hide" : "invalid"}
//                 >
//                   <FaTimesCircle className="ml-2 mt-1 text-red-500" />
//                 </span>
//               </label>
//               <input
//                 className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
//                 id="password"
//                 type="password"
//                 autoComplete="off"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 aria-describedby="passwordnote"
//                 aria-invalid={validPassword ? "false" : "true"}
//               />
//               <p
//                 id="passwordnote"
//                 className={
//                   password && !validPassword ? "instructions" : "offscreen"
//                 }
//               >
//                 <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
//                 8 to 24 characters. <br />
//                 Must include uppercase and lowercase letters, a number and
//                 special character <br />
//                 Allow special characters: !@#$
//               </p>
//             </div>
//             <div className=" mt-1 flex flex-col px-5 ">
//               <label
//                 htmlFor="passwordConfirm"
//                 className="py-2 text-[#011b5e] flex"
//               >
//                 Confirm password:
//                 <span
//                   className={validMatch && matchPassword ? "valid" : "hide"}
//                 >
//                   <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
//                 </span>
//                 <span
//                   className={validMatch || !matchPassword ? "hide" : "invalid"}
//                 >
//                   <FaTimesCircle className="ml-2 mt-1 text-red-500" />
//                 </span>
//               </label>
//               <input
//                 className=" border-2 border-x-gray-400 py-1 px-2 rounded-md outline-none"
//                 id="passwordConfirm"
//                 type="password"
//                 value={matchPassword}
//                 onChange={(e) => setMatchPassword(e.target.value)}
//                 required
//                 aria-describedby="confirnnote"
//                 aria-invalid={validMatch && matchPassword ? "false" : "true"}
//                 onFocus={() => setMatchFocus(false)}
//               />
//               <p
//                 id="confirnnote"
//                 className={!validMatch ? "instructions" : "offscreen"}
//               >
//                 <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
//                 must match the password input field
//               </p>
//             </div>
//             <button
//               disabled={
//                 !validEmail || !validPassword || !validMatch ? true : false
//               }
//               className=" bg-[#011b5e] shadow-blue-900 self-center text-gray-100 w-[10rem] rounded-lg p-2 mt-4 cursor-pointer hover:scale-105 ease-in duration-200"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className=" text-xs my-4 mx-4">
//             Already registered? <br />
//             <span>
//               {/* put router link here */}
//               <Link to="/" className=" text-sm text-[#011b5e] font-bold">
//                 Sign in
//               </Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Register;
