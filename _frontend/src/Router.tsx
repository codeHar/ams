import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import ArtistPage from "./pages/Artist/ArtistPage";
import ArtistCreatePage from "./pages/Artist/ArtistCreatePage";
import ArtistListPage from "./pages/Artist/ArtistListPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserPage />,
      },
      {
        path: "/artist",
        element: <ArtistPage />,
        children: [
          {
            index: true,
            element: <ArtistListPage />,
          },
          {
            path: "create",
            element: <ArtistCreatePage />,
          },
        ],
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
