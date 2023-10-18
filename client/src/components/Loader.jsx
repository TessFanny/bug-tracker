import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
const Loader = () => {
    
  return (
    <div className="absolute left-[50%] top-[50%] right-[50%] h-[100px] bottom-[50%] ">
      <ClipLoader

        color="#36d7b7"
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
