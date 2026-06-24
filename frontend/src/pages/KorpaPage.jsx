import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {dohvatiKorpu, obrisiStavkuIzKorpe} from "../services/korpaService";
import "../styles/Korpa.css";

function KorpaPage() {
    const [stavke, setStavke] =useState([]);

    useEffect(() => {
        ucitajKorpu();
    }, []);

    const ucitajKorpu = async () => {
        try {
            const res = await dohvatiKorpu();
            setStavke(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    const obrisiStavku = async (stavkaKorpeId) => {
        try {
            await obrisiStavkuIzKorpe(stavkaKorpeId);
            setStavke(stavke.filter((s) =>s.stavka_korpe_id !== stavkaKorpeId));
        } catch (err) {
            console.log(err);
        }
    };

    const ukupnaCena = stavke.reduce((sum, s) => sum + s.cena * s.kolicina, 0);
  
    return (
        <>
            <Header prijavljen />
            <div className="korpa-container">
                {stavke.length === 0 ? (
                    <p className="prazna-korpa">Korpa je prazna.</p>
                ) : (
                    <>
                        <div className="korpa-lista">
                            {stavke.map((stavka) => (
                                    <div key = { stavka.stavka_korpe_id}className="korpa-card">

                                        <img src={`http://localhost:5000/uploads/${stavka.slika}`} alt={stavka.naziv}/>

                                        <div className="korpa-info">
                                            <h3>{stavka.naziv}</h3>
                                            <p>Količina:{" "}{ stavka.kolicina }</p>

                                            <p>Cena:{" "}{stavka.cena}{" "}RSD</p>

                                            <p className="stavka-ukupno">Ukupno:{" "}{stavka.cena * stavka.kolicina}{" "}RSD</p>

                                            <div className="korpa-actions">
                                                <button className="obrisi-btn" onClick={() => obrisiStavku(stavka.stavka_korpe_id)}>
                                                    Obriši
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="korpa-summary">
                            <h2> Ukupno:{" "}{ukupnaCena}{" "}RSD</h2>

                            <button className="poruci-btn">Poruči</button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default KorpaPage;