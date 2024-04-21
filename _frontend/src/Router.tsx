import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/User/UserPage";
import ArtistPage from "./pages/Artist/ArtistPage";
import ArtistCreatePage from "./pages/Artist/ArtistCreatePage";
import ArtistListPage from "./pages/Artist/ArtistListPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UserListPage from "./pages/User/UserListPage";
import UserCreatePage from "./pages/User/UserCreatePage";
import InfoPage from "./pages/InfoPage";
import MusicPage from "./pages/Music/MusicPage";
import MusicListPage from "./pages/Music/MusicListPage";

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
        element: <InfoPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <UserListPage />,
          },
          {
            path: "create/:id?",
            element: <UserCreatePage />,
          },
        ],
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
            path: "create/:id?",
            element: <ArtistCreatePage />,
          },
          {
            path: ":id/music",
            element: <MusicPage />,
            children: [
              {
                index: true,
                element: <MusicListPage />,
              },
            ],
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
