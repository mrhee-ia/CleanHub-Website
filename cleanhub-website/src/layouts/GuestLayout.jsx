import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx"

function DefaultLayout() {

  const {token} = useStateContext()

  if (token) {
    return <Navigate to='/hub/feed' />
  }

  return (
    <>
      <p>guest layout</p>
      <Outlet />
    </>
  )
}

export default DefaultLayout