import React, { useEffect, useRef, useState } from "react";
import FormRow from "../components/FormRow";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const initialState = {
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading, isRegisteredFulfill } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isMember, setIsMember] = useState(true);

  useEffect(() => {
    if (isRegisteredFulfill) {
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    }
  }, [isRegisteredFulfill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { email, firstname, lastname, password, passwordConfirm, isMember } =
    //   values;
    if (
      !email ||
      !password ||
      (!isMember && !firstname) ||
      (!isMember && !lastname) ||
      (!isMember && !passwordConfirm)
    ) {
      toast.error("Veuillez remplir tous les champs");

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
      registerUser({ firstname, lastname, email, password, passwordConfirm })
    );
  };

  const toggleMember = () => {
    setIsMember(!isMember);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/layout/dashboard");
      }, 2000);
    }
  }, [user]);

  return (
    <section className=" h-screen grid justify-center items-center">
      <form
        className=" max-w-[400px]  border-t-[5px] border-teal-500 w-[90vw] shadow-lg rounded-sm py-[2rem] px-[2.5rem] my-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className=" flex items-center justify-center gap-4 mb-6">
          <img
            src="favicon_io/favicon-32x32.png"
            alt=""
            className="  bg-red-600"
          />
          <h2 className=" text-3xl text-purple-900 font-bold">Bug Tracker</h2>
        </div>

        <h3 className=" text-center">
          {isMember ? "Login" : "Register"}
        </h3>
        {/*section prénom*/}
        {!isMember && (
          <FormRow
            type="text"
            name="firstname"
            value={firstname}
            handleChange={(e) => setFirstname(e.target.value)}
          />
        )}
        {/*section nom*/}

        {!isMember && (
          <FormRow
            type="text"
            name="lastname"
            value={lastname}
            handleChange={(e) => setLastname(e.target.value)}
          />
        )}
        {/*section email*/}
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        {/*section password*/}
        <FormRow
          type="password"
          name="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        {/*section confirmation de mote de passe*/}
        {!isMember && (
          <FormRow
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            handleChange={(e) => setPasswordConfirm(e.target.value)}
          />
        )}
        {/* */}
        <div className="grid gap-y-2">
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "loading..." : "submit"}
          </button>
          <button
            type="button"
            className=" btn  bg-blue-300"
            disabled={isLoading}
            onClick={() =>
              dispatch(
                loginUser({ email: "testUser@gamil.com", password: "secret" })
              )
            }
          >
           {/* afficher Loading si ca charge et demo user au cas conttraire*/}
            {isLoading ? " Loading" : "Demo User"}
          </button>
        </div>

        <p className=" mt-5">
         {/* afficher Pas encore enregistré? si pas encore enregistré */}
          {isMember ? "Pas encore enregistré?" : "déjà enregistré?"}
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
