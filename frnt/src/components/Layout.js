import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  <header className="App-header">
    <p className="header-text">
      <Link to="/login">News A-Z </Link>
    </p>
    {localStorage.getItem("token") && (
      <button
        className="signout-button"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        SignOut
      </button>
    )}
  </header>;
}
