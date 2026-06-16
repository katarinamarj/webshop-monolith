import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>WebShop</h1>

                <nav>
                    <Link to="/login">Prijava</Link>
                    <Link to="/registracija">Registracija</Link>
                </nav>
            </header>
        </div>
    );
}

export default Dashboard;