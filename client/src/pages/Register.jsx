import React, { useEffect, useRef, useState } from "react";
import FormRow from "../components/FormRow";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import SmallLoader from "../components/SmallLoader";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// le mot de passe doit avoir au min une maj, une minuscule, un caractère spécial, un chiffre et doit etre compris entre 8 et 24 caractères
const password_REGEX = /(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  //const [values, setValues] = useState(initialState);
  const { user, isLoading, isRegisteredFulfill } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

  const [isMember, setIsMember] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = password_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    if (isRegisteredFulfill) {
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    }
  }, [isRegisteredFulfill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = password_REGEX.test(password);
    if (
      !email ||
      !password ||
      (!isMember && !firstname) ||
      (!isMember && !lastname) ||
      (!isMember && !matchPassword)
    ) {
      toast.error("Field cannot be empty");

      return;
    }

    if (!v1 || !v2) {
      toast.error("invalid entry");
      return;
    }
    if (isMember) {
      dispatch(
        loginUser({
          email,
          password,
        })
      );
      return;
    }
    dispatch(
      registerUser({
        firstname,
        lastname,
        email,
        password,
        passwordConfirm: matchPassword,
      })
    );
  };

  const toggleMember = () => {
    setIsMember(!isMember);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/layout/dashboard");
      }, 1000);
    }
  }, [user]);

  return (
    <section className=" h-screen grid justify-center items-center">
      <form
        className=" max-w-[400px]  border-t-[5px] border-teal-500 w-[90vw] shadow-lg rounded-sm py-[2rem] px-[2.5rem] my-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className=" flex flex-col items-center justify-center gap-2 mb-6">
          <div className=" flex  items-center justify-center gap-4 ">
            <img
              src="favicon_io/favicon-32x32.png"
              alt=""
              className="  bg-red-600"
            />
            <h2 className=" text-3xl text-purple-900 font-bold">Bug Tracker</h2>
          </div>

          <p className=" text-center">
            Organize, Track, Manage, and Resolve issues, bugs on your projects
          </p>
        </div>

        <h3 className=" text-center font-semibold">
          {isMember ? "Login" : "Register"}
        </h3>
        {/*section prénom*/}
        {!isMember && (
          <div className=" mb-[1rem]">
            <label
              htmlFor="firstname"
              className=" block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px] "
            >
              Firstname
            </label>

            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
            />
          </div>
        )}
        {/*section nom*/}

        {!isMember && (
          <div className=" mb-[1rem]">
            <label
              htmlFor="lastname"
              className=" block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px] "
            >
              Lastname
            </label>

            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
            />
          </div>
        )}
        {/*section email*/}
        <div className=" mb-[1rem]">
          <label
            htmlFor="email"
            className=" flex mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px] "
          >
            Email
            <span className={validEmail ? "valid" : "hide"}>
              <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FaTimesCircle className="ml-2 mt-1 text-red-500" />
            </span>
          </label>

          <input
          autoComplete="off"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
            aria-describedby="uidnote"
            aria-invalid={validEmail ? "false" : "true"}
          />
          <p
            id="uidnote"
            className={email && !validEmail ? "instructions" : "offscreen"}
          >
            <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            accepts letters, numbers
          </p>
        </div>
        {/*section password*/}
        <div className=" mb-[1rem]">
          <label
            htmlFor="password"
            className=" flex mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px] "
          >
            Password
            <span className={validPassword ? "valid" : "hide"}>
              <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
            </span>
            <span className={validPassword || !password ? "hide" : "invalid"}>
              <FaTimesCircle className="ml-2 mt-1 text-red-500" />
            </span>
          </label>

          <input
            id="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby="passwordnote"
            aria-invalid={validPassword ? "false" : "true"}
            className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
          />
          <p
            id="passwordnote"
            className={
              password && !validPassword ? "instructions" : "offscreen"
            }
          >
            <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and special
            character <br />
            Allow special characters: !@#$
          </p>
        </div>
        {/*section confirmation de mote de passe*/}
        {!isMember && (
          <div className=" mb-[1rem]">
            <label
              htmlFor="passwordConfirm"
              className=" flex mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px] "
            >
              Confirm password
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <FaCheckCircle className=" ml-2 mt-1 text-green-600" />
              </span>
              <span
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              >
                <FaTimesCircle className="ml-2 mt-1 text-red-500" />
              </span>
            </label>

            <input
              id="passwordConfirm"
              type="password"
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-describedby="confirnnote"
              aria-invalid={validMatch && matchPassword ? "false" : "true"}
              className=" w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] "
            />
            <p
              id="confirnnote"
              className={!validMatch ? "instructions" : "offscreen"}
            >
              <FaInfoCircle className=" text-red-700 mr-2 mt-1" />
              must match the password input field
            </p>
          </div>
        )}

        <div className="grid gap-y-2">
          <button type="submit" className="btn" disabled={isLoading} >
            {isLoading ? <SmallLoader /> : "submit"}
          </button>
          {isMember && (
            <div className=" grid gap-2">
              <h2> Demo users:</h2>
              {/* admin demo */}
              <button
                type="button"
                className=" btn  bg-blue-300"
                disabled={isLoading}
                onClick={() =>
                  dispatch(
                    loginUser({
                      email: "dev@oclock.fr",
                      password: "secret",
                    })
                  )
                }
              >
                {/* afficher Loading si ca charge et demo user au cas conttraire*/}
                {isLoading ? <SmallLoader /> : "Admin"}
              </button>
              {/* project manager demo */}
              <button
                type="button"
                className=" btn  bg-blue-300"
                disabled={isLoading}
                onClick={() =>
                  dispatch(
                    loginUser({
                      email: "manager@gmail.com",
                      password: "secret",
                    })
                  )
                }
              >
                {/* afficher Loading si ca charge et demo user au cas conttraire*/}
                {isLoading ? <SmallLoader /> : "Project Manager"}
              </button>

              {/* dev demo */}

              <button
                type="button"
                className=" btn  bg-blue-300"
                disabled={isLoading}
                onClick={() =>
                  dispatch(
                    loginUser({
                      email: "demotest@gmail.com",
                      password: "secret",
                    })
                  )
                }
              >
                {/* afficher Loading si ca charge et demo user au cas conttraire*/}
                {isLoading ? <SmallLoader /> : "Developer"}
              </button>
            </div>
          )}
        </div>

        <p className=" mt-5">
          {/* afficher Pas encore enregistré? si pas encore enregistré */}
          {isMember ? "Not a member yet?" : "Member?"}
          <button
            type="button"
            onClick={toggleMember}
            className=" text-blue-500 pl-3"
          >
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </section>
  );
};

export default Register;
