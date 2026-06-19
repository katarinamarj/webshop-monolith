import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const dohvatiProizvode = () => {
    return axios.get(`${API_URL}/proizvodi`);
};

export const dohvatiKategorije = () => {
    return axios.get(`${API_URL}/kategorije`);
};

export const dohvatiProizvod = (sifra) => {
    return axios.get(`${API_URL}/proizvodi/${sifra}`);
};