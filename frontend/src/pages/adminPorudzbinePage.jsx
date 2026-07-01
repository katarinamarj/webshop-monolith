import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dohvatiSvePorudzbine, promeniStatus } from "../services/adminPorudzbineService";
import "../styles/AdminPorudzbine.css";

function AdminPorudzbinePage() {
    const [porudzbine, setPorudzbine] = useState([]);

    useEffect(() => {
        ucitaj();
    }, []);

    async function ucitaj() {
        try {
            const res = await dohvatiSvePorudzbine();
            setPorudzbine(res.data);

        } catch (err) {
            console.log(err);
        }
    }

    async function promeni(id, status) {
        try {
            await promeniStatus(id, status);
            setPorudzbine(prev => prev.map(p => p.porudzbina_id === id ? {...p, status} : p));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header prijavljen />
            <div className="admin-container">
                <h1>Sve porudžbine</h1>

                {porudzbine.map(
                    porudzbina => (
                        <div key={porudzbina.porudzbina_id} className="admin-card">
                            <div className="admin-top">
                                <div>
                                    <h2>Porudžbina # {porudzbina.porudzbina_id}</h2>
                                    <p>{new Date(porudzbina.datum).toLocaleString()}</p>
                                </div>
                                <div>
                                    <select value={ porudzbina.status } onChange={e => promeni(porudzbina.porudzbina_id, e.target.value)}>
                                        <option value="placena">Plaćena</option>
                                        <option value="u obradi">U obradi</option>
                                        <option value="poslata">Poslata</option>
                                        <option value="isporucena">Isporučena</option>
                                        <option value="otkazana">Otkazana</option>
                                    </select>
                                </div>
                            </div>

                            <div className="kupac">
                                <h3>Kupac</h3>

                                <p> {porudzbina.ime} {" "} {porudzbina.prezime} </p>
                                <p> {porudzbina.email} </p>
                                <p> {porudzbina.ulica}, {porudzbina.postanski_broj} {porudzbina.grad} </p>
                                <p> {porudzbina.telefon} </p>
                            </div>

                            <div className="stavke">
                                <h3>Proizvodi</h3>

                                {porudzbina.stavke.map(
                                    stavka => (

                                        <div key={stavka.sifra} className="stavka">

                                            <img src={`http://localhost:5000/uploads/${stavka.slika}`} alt={stavka.naziv}/>

                                            <div>
                                                <h4>{stavka.naziv}</h4>
                                                <p> Količina: {" "} {stavka.kolicina}</p>
                                                <p> Cena: {" "} {stavka.cena} {" "}RSD</p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <h2 className="ukupno">Ukupno: {" "} {porudzbina.ukupan_iznos} {" "} RSD</h2>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}

export default AdminPorudzbinePage;