import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = (props) => {
  // Access the loggedIn state from Redux store
  const loggedIn = useSelector(state => state.user.loggedIn);

  // If user is not logged in, redirect to login page
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  // If user is logged in, render the children components
  return props.children;
}

export default RequireAuth;
