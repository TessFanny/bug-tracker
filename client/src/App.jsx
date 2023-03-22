import Register from "./components/Register"
import Login from "./components/Login"
function App() {
  
  return (
    <main className=" py-10 flex flex-col justify-center h-full items-center bg-gradient-to-b from-blue-200 to-blue-500 ">
      <h1 className=" text-4xl py-6 text-[#011b5e] font-bold">Bug tracker app</h1>
     <Register />
     {/* <Login/> */}
    </main>
  )
}

export default App
