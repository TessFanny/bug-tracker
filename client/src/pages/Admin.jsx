import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { editUser, getAllUsers } from "../features/users/usersSlice";
import { changeRoleValue } from "../features/user/userSlice";

const Admin = () => {
  const { users } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  // search
  const [searchQuery, setSearchQuery] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // edit user role
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // set user id
  const [role, setRole] = useState("");

  // useEffect(()=>{
  //   dispatch(changeRoleValue(editingUser))
  // }, [editingUser])
  useEffect(()=>{
dispatch(getAllUsers())
  }, [])
  

  const filterTableData = () => {
    return users.filter((user) => {
      return Object.values(user).some((cell) => {
        if (cell === null) {
          return false;
        }
        return cell
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    });
  };
  // pagination
  const totalPages = Math.ceil(filterTableData().length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterTableData().slice(startIndex, endIndex);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editingUser);
    dispatch(
      editUser({
        user_id: editingUser.id,
        role,
      })
    );
    setEditingUser(null);
  };
  return (
    <section className=" h-screen flex flex-col gap-10 mt-[6rem]">
      <div className=" flex justify-center items-center w-full">
        <div className=" flex justify-center items-center w-[70%]">
          <div className="  mt-4 pb-4 bg-white rounded-md shadow-md px-4 flex-1">
            <div className=" flex justify-between mb">
              <h2 className=" p-4 text-xl font-semibold">Manage users</h2>
              <div className=" flex w-[50%] items-center self-end bg-slate-100 px-2 py-1 rounded-lg mt-4 shadow-lg">
                <AiOutlineSearch className=" text-2xl" />
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="search user"
                  defaultValue={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" w-full pl-2 py-1 outline-none bg-slate-100 "
                />
              </div>
            </div>
            <div className="shadow-lg overflow-auto pb-3 mt-5">
              <table className=" w-full  ">
                <thead className=" bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Name
                    </td>

                    <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Email
                    </td>
                    <td className=" p-3 text-sm font-semibold tracking-wide text-left capitalize">
                      Role
                    </td>
                    <td className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Delete
                    </td>
              
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-100 ">
                  {getCurrentPageData().map((user, id) => (
                    <tr key={id}>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {user.firstname.charAt(0).toUpperCase() +
                          user.firstname.slice(1)}{" "}
                        {user.lastname.charAt(0).toUpperCase() +
                          user.lastname.slice(1)}
                      </td>

                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap flex items-center gap-2">
                        {editingUser && editingUser.id === user.id ? (
                          <form onSubmit={handleSubmit} className=" flex gap-2">
                            <select
                              id="role"
                              defaultValue={user.role}
                              className=" px-4 border-[1px] rounded-sm  bg-[#f0f4f8] outline-none py-[0.225rem]"
                              onChange={(e) => {
                                setRole(prevRole => e.target.value);
                              
                              }}
                            >
                              <option value="developer">
                                developer
                              </option>
                              <option value="lead developer">
                                lead developer
                              </option>
                              <option value="admin">admin</option>
                            </select>
                            <button className="bg-blue-400 px-7 rounded-md">
                              Update
                            </button>
                          </form>
                        ) : (
                          <div className=" flex gap-2">
                            {user.role}
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setIsEditing(true);
                              }}
                            >
                              <FaEdit size="15px" color="#3b82f6" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button className="h-[32px] w-[32px] flex justify-center items-center active:border-white duration-300">
                          <HiOutlineTrash size="15px" color="red" />
                        </button>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" flex gap-5 pl-5">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    disabled={currentPage === index + 1}
                    className=" w-[25px] h-[25px] bgGradient text-white rounded-full flex justify-center items-center"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
