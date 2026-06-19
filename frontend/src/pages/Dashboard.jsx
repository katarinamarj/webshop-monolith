import "../styles/Dashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { dohvatiProizvode, dohvatiKategorije } from "../services/dashboardService";
import { Link } from "react-router-dom";

function Dashboard() {
    const prijavljen = !!localStorage.getItem("accessToken");
    const [proizvodi, setProizvodi] = useState([]);
    const [kategorije, setKategorije] = useState([]);
    const [pretraga, setPretraga] = useState("");
    const [kategorijaId, setKategorijaId] = useState("");

    useEffect(() => {
        const ucitajPodatke = async () => {
            try {
                const proizvodiRes = await dohvatiProizvode();
                const kategorijeRes = await dohvatiKategorije();

                setProizvodi(proizvodiRes.data);
                setKategorije(kategorijeRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        ucitajPodatke();

    }, []);

    const filtriraniProizvodi = proizvodi.filter(
        (proizvod) => {
            const odgovaraNazivu = proizvod.naziv.toLowerCase().includes(pretraga.toLowerCase());
            const odgovaraKategoriji = kategorijaId === "" || proizvod.kategorija_id === Number(kategorijaId);

            return (odgovaraNazivu && odgovaraKategoriji);
        }
    );

    return (
        <>
            <Header prijavljen={prijavljen} />
            <div className="dashboard-container">

                <section className="filter-section">

                    <input
                        type="text"
                        placeholder="Pretraga proizvoda..."
                        value={pretraga}
                        onChange={(e) =>
                            setPretraga(e.target.value)
                        }
                    />

                    <select
                        value={kategorijaId}
                        onChange={(e) =>
                            setKategorijaId(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Sve kategorije
                        </option>

                        {kategorije.map(k => (

                            <option
                                key={k.kategorija_id}
                                value={k.kategorija_id}
                            >
                                {k.naziv}
                            </option>

                        ))}
                    </select>

                </section>

                <section className="products-grid">

                    {filtriraniProizvodi.map(
                        (proizvod) => (
                            <div key={proizvod.sifra} className="product-card">

                                <img
                                    src={`http://localhost:5000/uploads/${proizvod.slika}`}
                                    alt={proizvod.naziv}
                                />

                                <h3>{proizvod.naziv}</h3>

                                <Link to={`/proizvodi/${proizvod.sifra}`}>
                                    <button>
                                        Detalji
                                    </button>
                                </Link>
                            </div>
                        )
                    )}
                </section>
            </div>

            <Footer />
        </>
    );
}

export default Dashboard;