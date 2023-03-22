import React from 'react'

const Login = () => {


    // const userRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState("");
  // const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  // const [pwd, setPwd] = useState("");
  // const [validPwd, setValidPwd] = useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setMatchPwd] = useState("");
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  // const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   const result = EMAIL_REGEX.test(user);
  //   console.log(result);
  //   console.log(user);
  //   setValidName(result);
  // }, [user]);

  // useEffect(() => {
  //   const result = PWD_REGEX.test(pwd);
  //   console.log(result);
  //   console.log(pwd);
  //   setValidPwd(result);
  //   const match = pwd === matchPwd;
  //   setValidMatch(match);
  // }, [pwd, matchPwd]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd, matchPwd]);
  return (
    <div>
       <div className=" flex flex-col w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden md:flex-row">
      <div className=" md:w-1/2 bg-violet-400 flex justify-center items-center flex-col px-3">
        <h2 className=" text-3xl py-5 text-[#011b5e]"> welcome</h2>
        <div>
          <p className=" text-white py-5 px-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quod
            ratione incidunt nihil sint voluptatibus. Illum, nobis, cumque iusto
            maiores perspiciatis tempora ratione{" "}
          </p>
        </div>
      </div>
      <div className=" md:w-1/2  flex flex-col py-3 md:py-10 md:px-7">
        <h2 className="mb-4 text-3xl text-center text-[#011b5e]">Login</h2>
        <p className="mb-4 text-center text-[#011b5e]"> create your account.</p>
        <form className="flex flex-col">
          
          <div className=" mt-1 flex flex-col px-5 ">
            <label htmlFor="firstname" className="py-2 text-[#011b5e]">
              Email:
            </label>
            <input className=" border-2 border-x-gray-400 py-1 px-2 rounded-md" />
          </div>
          <div className=" mt-1 flex flex-col px-5 ">
            <label htmlFor="firstname" className="py-2 text-[#011b5e]">
              Password:
            </label>
            <input className=" border-2 border-x-gray-400 py-1 px-2 rounded-md" />
          </div>
          
          <button className=" bg-[#011b5e] self-center text-gray-100 w-[10rem] rounded-lg p-2 mt-4">Submit</button>
        </form>
      </div>
    </div>

    </div>
  )
}

export default Login