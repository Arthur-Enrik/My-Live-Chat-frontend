import { Navigate, Outlet } from "react-router-dom";

import { TOKEN } from "../../utils/token.utils";

function ProtectedRoute() {
	const token = TOKEN.get();

	if (!token) return <Navigate to="/login" replace />;

	return <Outlet />;
}

export { ProtectedRoute };
