import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const SmallLoader = () => {
  return (
    <div className=" ">
      <ClipLoader

        color="#36d7b7"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default SmallLoader