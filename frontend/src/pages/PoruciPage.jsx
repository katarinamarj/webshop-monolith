import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Porudzbina.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PoruciPage() {
    const navigate = useNavigate();

    const [forma, setForma] = useState({
        ulica: "",
        grad: "",
        postanskiBroj: "",
        telefon: ""
    });

    const [greska, setGreska] = useState("");

    const handleChange = (e) => {
        setForma({
            ...forma,
            [e.target.name]: e.target.value
        });

        setGreska("");
    };

    const dalje = () => {
        if (
            !forma.ulica.trim() || !forma.grad.trim() ||
            !forma.postanskiBroj.trim() || !forma.telefon.trim()
        ) {
            setGreska("Morate popuniti sva polja.");
            return;
        }

        localStorage.setItem("podaciZaIsporuku", JSON.stringify(forma));

        navigate("/placanje");
    };

    return (
        <>
        <Header prijavljen />
        <div className="poruci-page">
            <div className="forma-container">
                <h1>Podaci za isporuku</h1>

                <input
                    name="ulica"
                    placeholder="Ulica"
                    value={forma.ulica}
                    onChange={handleChange}
                />

                <input
                    name="grad"
                    placeholder="Grad"
                    value={forma.grad}
                    onChange={handleChange}
                />

                <input
                    name="postanskiBroj"
                    placeholder="Poštanski broj"
                    value={forma.postanskiBroj}
                    onChange={handleChange}
                />

                <input
                    name="telefon"
                    placeholder="Telefon"
                    value={forma.telefon}
                    onChange={handleChange}
                />

                {greska && (
                    <p className="greska">{greska}</p>
                )}

                <button onClick={dalje}>Nastavi na plaćanje</button>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default PoruciPage;