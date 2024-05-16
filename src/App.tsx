import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./hooks";
import { useEffect } from "react";
import { LoadingScreen } from "./components";

const unprotectedRoutes = ["/auth"];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    if (user !== null || unprotectedRoutes.includes(location.pathname)) return;
    navigate("/auth");
  }, [user, location.pathname, navigate]);

  if (!user && !unprotectedRoutes.includes(location.pathname)) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};

export default App;
