import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const auth = useSelector((state) => state.jwt);

  if (auth){
    return <Navigate to="/dashboard" />;
  }else{
    return children;
  }
}

export default OpenRoute;
