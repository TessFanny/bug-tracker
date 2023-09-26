import React from "react";
import NavBar from "../../components/NavBar";
import SmallSideBar from "../../components/SmallSideBar";
import BigSideBar from "../../components/BigSideBar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <section className=" flex flex-row bg-emerald-600 h-screen overflow-hidden w-screen">
      <main className="grid grid-cols-1">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className=" w-[90%] md:w-[90vw] my-0 mx-auto py-7 px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default SharedLayout;
