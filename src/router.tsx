import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import {
  AuthPage,
  DashboardPage,
  MovieInfoPage,
  MoviePlayerPage,
  MovieShoppingPage,
  NotFoundPage,
} from "./pages";

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
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
