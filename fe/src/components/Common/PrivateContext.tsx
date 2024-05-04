import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../functions/useAuth";

const PrivateContext = () => {
  const { getAccessToken } = useAuth();
  const auth = getAccessToken()
  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateContext;
