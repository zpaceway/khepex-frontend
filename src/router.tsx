import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import MoviePlayerPage from "./pages/MoviePlayerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "play/:movieId",
        element: <MoviePlayerPage />,
      },
    ],
  },
]);

export default router;
