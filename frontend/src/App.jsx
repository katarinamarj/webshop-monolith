import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/LoginPage";
import Registracija from "./pages/RegistracijaPage";
import Dashboard from "./pages/Dashboard";
import ProizvodPage from "./pages/ProizvodPage";
import KorpaPage from "./pages/KorpaPage";
import PlacanjePage from "./pages/PlacanjePage";
import PoruciPage from "./pages/PoruciPage";
import UspesnaPorudzbinaPage from "./pages/UspesnaPorudzbinaPage";
import MojePorudzbinePage from "./pages/MojePorudzbinePage";
import AdminPorudzbinePage from "./pages/adminPorudzbinePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registracija" element={<Registracija />} />
                <Route path="/proizvodi/:sifra" element={<ProizvodPage />}/>
                <Route path="/korpa" element={<KorpaPage />}/>
                <Route path="/poruci" element={<PoruciPage />}/>
                <Route path="/placanje" element={<PlacanjePage />}/>
                <Route path="/uspesna-porudzbina/:id" element={<UspesnaPorudzbinaPage />}/>
                <Route path="/porudzbine" element={<MojePorudzbinePage />}/>
                <Route
    path="/admin/porudzbine"
    element={<AdminPorudzbinePage />}
/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;