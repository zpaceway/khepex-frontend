import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
