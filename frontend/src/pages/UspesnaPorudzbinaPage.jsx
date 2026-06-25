import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Porudzbina.css";

function UspesnaPorudzbinaPage() {

    const { id } = useParams();

    return (
        <>
            <Header prijavljen />
            <div className="uspesna-page">
                <div className="uspesna-container">
                    <h1>Porudžbina je uspešno kreirana.</h1>
                    <h2>Broj porudžbine: {id}</h2>
                    <p>Hvala vam na kupovini.</p>
                    <p>Status porudžbine možete pratiti na stranici<strong>"Moje porudžbine"</strong>.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UspesnaPorudzbinaPage;