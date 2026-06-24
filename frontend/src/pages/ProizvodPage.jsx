import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dohvatiProizvod } from "../services/dashboardService";
import "../styles/ProizvodPage.css";
import { dodajUKorpu } from "../services/korpaService";

function ProizvodPage() {
    const { sifra } = useParams();
    const [proizvod, setProizvod] = useState(null);
    const prijavljen = !!localStorage.getItem("accessToken");

    useEffect(() => {
        const ucitajProizvod = async () => {
            try {
                const response = await dohvatiProizvod(sifra);
                setProizvod(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        ucitajProizvod();

    }, [sifra]);

    if (!proizvod) {
        return <p>Učitavanje...</p>;
    }

    const handleDodajUKorpu = async () => {
        try {
            await dodajUKorpu(proizvod.sifra);

        } catch (err) {
            console.error(err);
            alert("Greška pri dodavanju u korpu");
        }
    };

    return (
        <>
            <Header prijavljen={prijavljen} />
            <div className="detalji-container">
                <div className="detalji-card">
                    <div className="detalji-slika">
                        <img
                            src={`http://localhost:5000/uploads/${proizvod.slika}`}
                            alt={proizvod.naziv}
                        />
                    </div>
                    <div className="detalji-info">

                        <h1>{proizvod.naziv}</h1>
                        <p className="kategorija">{proizvod.kategorija}</p>
                        <p className="opis">{proizvod.opis}</p>

                        <div className="kupovina-sekcija">
                            <p className="cena">{proizvod.cena} RSD</p>

                            <button className="korpa-btn" disabled={!prijavljen} onClick={handleDodajUKorpu}>
                                Dodaj u korpu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProizvodPage;