import FormRow from "../components/FormRow";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  changeLastnameValue,
  changeFirstnameValue,
  changeRoleValue,
  changeEmailValue,
  updateUser,
} from "../features/user/userSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { id, firstname, lastname, email, role } = user;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !role) {
      toast.error("please fill out all fields");
      return;
    }
    dispatch(
      updateUser({
        user,
      })
    );
  };

  return (
    <form
      className=" w-[90vw] max-w-[700px] bg-white rounded-[0.25rem] shadow-md  py-[2rem] px-[2.5rem] my-[3rem] mx-auto ease-in-out duration-[0.3] transition-all hover:[shadow-xl]"
      onSubmit={handleSubmit}
    >
      <h3 className=" text-lg font-bold ">Profile</h3>
      <div className=" grid md:grid-cols-3 gap-2">
        <FormRow
          type="text"
          name="firstname"
          value={firstname}
          handleChange={(evt) => {
            dispatch(changeFirstnameValue(evt.target.value));
          }}
        />
        <FormRow
          type="text"
          name="lastname"
          value={lastname}
          handleChange={(evt) => {
            dispatch(changeLastnameValue(evt.target.value));
          }}
        />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(evt) => {
            dispatch(changeEmailValue(evt.target.value));
          }}
        />
        

        <button
          className="btn btn-block self-end h-[35px] mt-[1rem]"
          type="submit"
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export default Profile;
