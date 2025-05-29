import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Chat } from "./pages/Chats";
import { Login } from "./pages/Registration/Login";
import { Register } from "./pages/Registration/Register";

import { NotFound } from "./pages/UtilsPages/NotFound";
import { ProtectedRoute } from "./pages/UtilsPages/ProtectedRoute";

const router = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: "/chat",
				element: <Chat />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export { App };
