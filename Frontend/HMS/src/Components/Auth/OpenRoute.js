import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const auth = useSelector((state) => state.jwt);
  let user = null;

  if (auth) {
    user = jwtDecode(auth);
  }

  if (auth && user) {
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} />;
  } else {
    return children;
  }
}

export default OpenRoute;
