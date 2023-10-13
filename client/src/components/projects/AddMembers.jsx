import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/usersSlice";
import { addMember } from "../../features/projects/projectSlice";


const AddMembers = ({closeModal, projectId}) => {
  const { users } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const [selectedMembersId, setSelectedMembersId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleMemberChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    console.log(value);
    if (checked) {
      setSelectedMembersId([...selectedMembersId, value]);

      console.log(true);
    } else {
      setSelectedMembersId((prev) => prev.filter((id) => id !== value));

      console.log(false);
    }
  };
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(selectedMembersId);
    if (isLoading) return;

    setIsLoading(true);
    
      selectedMembersId.forEach(async(user_id) => {
        console.log(user_id);
        dispatch(addMember({ user_id, projectId}));
      });
    setIsLoading(false);
    closeModal();
  };
  

  return (
    <div>
      <div>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
          <fieldset
          onSubmit={handleSubmit}
          className="w-full py-[0.375rem] px-[0.75rem] text-sm  rounded-[0.25rem] border-[1px] border-[#bcccdc]  bg-white max-h-[150px] flex gap-20 overflow-auto"
        >
          <div>
            <h4>Name</h4>
            {users.map((user) => {
              return (
                <div className=" flex  gap-4" key={user.id}>
                  <input
                    type="checkbox"
                    id={user.id}
                    name="contributor"
                    value={user.id}
                    onChange={handleMemberChange}
                  />
                  <label htmlFor={user.id}>
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

          <button
            type="submit"
            className=" bg-green-700 w-[5rem] self-center py-1 rounded-lg"
          >
            Submit
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default AddMembers;
