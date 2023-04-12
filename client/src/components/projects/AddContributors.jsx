import React from "react";
import { useSelector, useDispatch } from "react-redux";

const AddContributors = () => {
  const { users } = useSelector((store) => store.users);
  return (
    <div>
      <div>
        <h3> Contributors</h3>
        <fieldset className="  w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-[#f0f4f8] max-h-[150px] flex gap-20 overflow-auto">
          <div >
          <h4>Name</h4>
            {users.map((user) => {
              return (
                <div className=" flex  gap-4" key={user.id}>
                  <div></div>
                  <input type="checkbox" id="contributor" name="contributor" />
                  <label htmlFor="contributor">
                    {user.firstname} {user.lastname}
                  </label>
                </div>
              );
            })}
          </div>

          <div>
          <h4>Role</h4>
            {users.map((user) => {
              return (
                <div className=" flex  gap-4" key={user.id}>
                  <div> {user.role}</div>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default AddContributors;
