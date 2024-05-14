import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useMovies } from "./hooks";
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

const unprotectedRoutes = ["/auth"];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  useMovies();

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
