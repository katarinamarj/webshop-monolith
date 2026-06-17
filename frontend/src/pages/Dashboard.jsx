import "../styles/Dashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Dashboard() {

    const prijavljen = !!localStorage.getItem("accessToken");

    return (
        <>
            <Header prijavljen={prijavljen} />
            <Footer />
        </>
    );
}

export default Dashboard;