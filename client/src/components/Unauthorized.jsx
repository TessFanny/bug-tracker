import React from 'react'
import { useNavigate } from 'react-router-dom'



const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = ()=> navigate(-1)
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>you do not have access to the requested page</p>
      <div>
        <button onClick={goBack}> Go back</button>
      </div>
    </div>
  )
}

export default Unauthorized