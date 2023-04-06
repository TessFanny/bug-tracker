import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllTickets } from "../features/tickets/ticketsSlice"

const Bug = () => {
  const  {tickets} = useSelector(store => store.tickets)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTickets())
  },[])
  console.log(tickets);
  return (
    <div>tickets</div>
  )
}

export default Bug