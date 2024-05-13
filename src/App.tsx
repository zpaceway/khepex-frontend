import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks";
import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

const unprotectedRoutes = ["/auth"];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null || unprotectedRoutes.includes(location.pathname)) return;
    navigate("/auth");
  }, [user, location.pathname, navigate]);

  if (!user && !unprotectedRoutes.includes(location.pathname)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-zinc-800">
        <CgSpinner className="animate-spin text-4xl text-white" />
      </div>
    );
  }

  return <Outlet />;
};

export default App;
