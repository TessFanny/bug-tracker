import { Link } from 'react-router-dom'
import missing from '../assets/missing.png'
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom'
const Missing = () => {
  const { auth} = useAuth();
  const navigate = useNavigate();
  const goBack = ()=> navigate(-1)
  return (
    <main className=' min-h-[100vh] align-bottom flex flex-col items-center justify-center'>
      <img src={missing} alt="not found" className=' w-[90vw] max-w-[800px] block mb-[2rem]' />
      <h3 className=' mb-[0.5rem] text-3xl'> Ohh! page not found </h3>
      <p className=' mt-0 mb-[0.5rem] text-gray-500'>We can't seem to find the page you're looking for</p>
      <button onClick={goBack}> Go back</button>
      
    </main>
  )
}

export default Missing