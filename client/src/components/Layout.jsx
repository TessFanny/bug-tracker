import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <main className="py-10 flex flex-col justify-center min-h-screen items-center bg-gradient-to-b from-blue-200 to-blue-500">
        <Outlet/>
    </main>
  )
}

export default Layout