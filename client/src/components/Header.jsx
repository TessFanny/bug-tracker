import React from 'react'

const Header = ({title, user}) => {
  return (
    <div className=" absolute top-0 left-0 md:left-[220px] w-full  h-[8rem] shadow-lg flex items-center justify-center">
    <h2> Welcome {user.firstname}</h2>
    <h1 className=' text-black font-semibold text-3xl md:mr-[220px] uppercase'> {title}</h1>
    </div>
  )
}

export default Header