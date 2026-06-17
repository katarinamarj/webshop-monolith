import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";
import { logout } from "../services/authService";

function Header({ prijavljen }) {

    const location = useLocation();

    const authPage =
        location.pathname === "/login" ||
        location.pathname === "/registracija";

    const handleLogout = async () => {

        try {
            await logout();
        } catch (err) {
            console.error(err);
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/";
    };

    return (
        <header className="header">

            <Link to="/" className="logo">
                Web App
            </Link>

            {!authPage && (
                <nav className="nav">
                    {!prijavljen ? (
                        <>
                            <Link to="/login">Prijava</Link>
                            <Link to="/registracija">Registracija</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/korpa">Korpa</Link>
                            <Link to="/porudzbine">Moje porudžbine</Link>

                            <button className="logout-btn" onClick={handleLogout}>
                                Odjava
                            </button>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}

export default Header;