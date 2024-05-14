import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import MoviePlayerPage from "./pages/MoviePlayerPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import MovieShoppingPage from "./pages/MovieShoppingPage";

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
        path: "movie/:movieId",
        element: <MovieInfoPage />,
      },
      {
        path: "play/:movieId",
        element: <MoviePlayerPage />,
      },
      {
        path: "buy/:movieId",
        element: <MovieShoppingPage mode="buy" />,
      },
      {
        path: "rent/:movieId",
        element: <MovieShoppingPage mode="rent" />,
      },
    ],
  },
]);

export default router;
