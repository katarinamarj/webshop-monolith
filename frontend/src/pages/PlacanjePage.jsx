import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { kreirajPorudzbinu } from "../services/porudzbinaService";
import "../styles/Porudzbina.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PlacanjePage() {
    const navigate = useNavigate();

    const [kartica, setKartica] = useState("");
    const [datum, setDatum] = useState("");
    const [cvv, setCvv] = useState("");
    const [greska, setGreska] = useState("");

    const handleKarticaChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        value = value.substring(0, 16);

        value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

        setKartica(value);
        setGreska("");
    };

    const handleDatumChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        value = value.substring(0, 4);

        if (value.length >= 3) {
            value =value.substring(0, 2) + "/" + value.substring(2);
        }

        setDatum(value);
        setGreska("");
    };

    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        setCvv(value.substring(0, 3));
        setGreska("");
    };

    const plati = async () => {

        if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(kartica)) {
            setGreska("Broj kartice mora biti u formatu 1234 5678 9012 3456.");
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(datum)) {
            setGreska("Datum mora biti u formatu MM/GG.");
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            setGreska("CVV mora sadržati tačno 3 cifre.");
            return;
        }

        try {
            const podaci = JSON.parse(localStorage.getItem("podaciZaIsporuku"));

            const res = await kreirajPorudzbinu(podaci);

            localStorage.removeItem("podaciZaIsporuku");

            navigate(`/uspesna-porudzbina/${res.data.porudzbinaId}`);

        } catch (err) {
            console.log(err);
            setGreska("Greška prilikom kreiranja porudžbine.");
        }
    };

    return (
        <>
        <Header prijavljen />
        <div className="poruci-page">
            <div className="forma-container">
                <h1>Plaćanje</h1>

                <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={kartica}
                    onChange={handleKarticaChange}
                />

                <input
                    type="text"
                    placeholder="MM/GG"
                    value={datum}
                    onChange={handleDatumChange}
                />

                <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={handleCvvChange}
                />

                {greska && (
                    <p className="greska">
                        {greska}
                    </p>
                )}

                <button onClick={plati}>Plati</button>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default PlacanjePage;