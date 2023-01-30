import { Navigate } from "react-router-dom";

function ProtectedRoute({Component, isLoggedIn, ...props}) {
  console.log(isLoggedIn);
  return isLoggedIn  ? <Component {...props} /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
