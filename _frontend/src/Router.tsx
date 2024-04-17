import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import ArtistPage from "./pages/ArtistPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/artist",
        element: <ArtistPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
