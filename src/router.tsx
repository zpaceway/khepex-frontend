import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

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
    ],
  },
]);

export default router;
