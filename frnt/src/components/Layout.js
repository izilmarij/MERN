import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <main className="main">
      <Outlet />
    </main>
  );
}
