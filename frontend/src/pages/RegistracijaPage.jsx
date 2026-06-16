import { useState } from "react";
import { registracija } from "../services/authService";
import "../styles/Auth.css";

function RegistracijaPage() {

    const [forma, setForma] = useState({
        ime: "",
        prezime: "",
        email: "",
        lozinka: ""
    });

    const [poruka, setPoruka] = useState("");
    const [uspeh, setUspeh] = useState(false);

    const handleChange = (e) => {
        setForma({
            ...forma,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await registracija(forma);

            setUspeh(true);
            setPoruka(response.data.message);

            setForma({
                ime: "",
                prezime: "",
                email: "",
                lozinka: ""
            });

        } catch (err) {

            setUspeh(false);

            setPoruka(
                err.response?.data?.message ||
                "Greška pri registraciji."
            );
        }
    };

    return (
    <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Registracija</h2>

            <form className="auth-form" onSubmit={handleSubmit}>

                <div className="auth-field">
                    <label>Ime</label>
                    <input
                        type="text"
                        name="ime"
                        value={forma.ime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label>Prezime</label>
                    <input
                        type="text"
                        name="prezime"
                        value={forma.prezime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={forma.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label>Lozinka</label>
                    <input
                        type="password"
                        name="lozinka"
                        value={forma.lozinka}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="auth-btn" type="submit">
                    Registruj se
                </button>

            </form>

            {poruka && (
                <div
                    className={`auth-message ${uspeh ? "success" : "error"}`}>
                    {poruka}
                </div>
            )}

            <div className="auth-link">
                Već imate nalog?{" "}
                <a href="/login">
                    Prijavite se
                </a>
            </div>
        </div>
    </div>
);
}

export default RegistracijaPage;