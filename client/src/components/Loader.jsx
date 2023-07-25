import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
const Loader = () => {
    
  return (
    <div className="absolute left-[50%] top-[35%] right-[50%] h-[100px] ">
      <HashLoader
        color="#36d7b7"
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
