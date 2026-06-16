import { useState } from "react";
import { prijava } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [poruka, setPoruka] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await prijava({
                email,
                 lozinka
            });

            navigate("/dashboard");

        } catch (err) {
            setPoruka(
                err.response?.data?.message ||
                "Pogrešni podaci."
            );

        }
    };

    return (
    <div className="auth-container">
    <div className="auth-card">
        <h2 className="auth-title">Prijava</h2>

        <form className="auth-form" onSubmit={handleSubmit}>

            <div className="auth-field">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="auth-field">
                <label>Lozinka</label>
                <input
                    type="password"
                    value={lozinka}
                    onChange={(e) => setLozinka(e.target.value)}
                    required
                />
            </div>

            <button className="auth-btn" type="submit">
                Prijavi se
            </button>
        </form>

        {poruka && (
            <div className={`auth-message error`}>
                {poruka}
            </div>
        )}

        <div className="auth-link">
            Nemate nalog? <a href="/registracija">Registrujte se</a>
        </div>
    </div>
</div>
);
}

export default LoginPage;