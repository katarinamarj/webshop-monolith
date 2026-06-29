import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dohvatiMojePorudzbine } from "../services/porudzbinaService";
import "../styles/MojePorudzbine.css";

function MojePorudzbinePage() {
    const [porudzbine, setPorudzbine] = useState([]);
    
    useEffect(() => {
        ucitajPorudzbine();
    }, []);

    const ucitajPorudzbine = async () => {
            try {
                const res = await dohvatiMojePorudzbine();
                setPorudzbine(res.data);
            } catch (err) {
                console.log(err);
            }
        };

    return (
        <>
            <Header prijavljen />
            <div className="porudzbine-container">
                <h1 className="porudzbine-title">Moje porudžbine</h1>

                {porudzbine.length === 0 ? (
                    <p className="nema-porudzbina">Nemate nijednu porudžbinu.</p>
                ) : (
                    <div className="porudzbine-lista">
                        {porudzbine.map(
                            (porudzbina) => (
                                <div key={porudzbina.porudzbina_id} className="porudzbina-card">
                                    <div className="porudzbina-header">
                                        <div>
                                            <h3>Porudžbina #{porudzbina.porudzbina_id}</h3>

                                            <p><strong>Datum:</strong>{" "}
                                                {new Date(porudzbina.datum).toLocaleDateString("sr-RS")}</p>
                                        </div>

                                        <div className="desna-strana">

                                            <span className={`status ${porudzbina.status}`}>
                                                {porudzbina.status}
                                            </span>

                                            <h2>{porudzbina.ukupan_iznos} RSD</h2>
                                        </div>
                                    </div>

                                    <p><strong>Datum:</strong>{" "}
                                        {new Date(porudzbina.datum).toLocaleDateString("sr-RS")}</p>

                                    <p><strong>Ukupna cena:</strong>{" "}{porudzbina.ukupan_iznos} RSD</p>
                                        <div className="stavke-tabela">
                                            <div className="stavke-header">
                                                <span>Proizvod</span>
                                                <span>Količina</span>
                                                <span>Cena</span>
                                            </div>

                                            {porudzbina.stavke.map((stavka) => (
                                                <div key={stavka.sifra} className="stavka-red">
                                                    <span>{stavka.naziv}</span>
                                                    <span>{stavka.kolicina}</span>
                                                    <span>{stavka.cena} RSD</span>
                                                </div>
                                            ))}
                                        </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default MojePorudzbinePage;