import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/LoginPage";
import Registracija from "./pages/RegistracijaPage";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registracija" element={<Registracija />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;