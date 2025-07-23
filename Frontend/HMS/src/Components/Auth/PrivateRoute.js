// PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.jwt);
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
