import React, { useContext } from 'react'
import TableUsers from '../components/TableUsers'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context';

const City = () => {

  const { user } = useContext(UserContext);

  const storedUser = JSON.parse(localStorage.getItem("usuario"));

  const { city } = useParams()
  const navigate = useNavigate()

  const email = user?.email;
  const ciudadUser = email ? email.match(/@(.+?)\./)?.[1] : "";
  
  if (!ciudadUser) {
    navigate("/")
    return
  } else if (ciudadUser !== city && ciudadUser !== "general") {
    navigate("/dashboard")
    return
  }

  return (
    <TableUsers />
  )
}

export default City