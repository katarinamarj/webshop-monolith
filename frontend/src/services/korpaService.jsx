import api from "./apiService";

export const dohvatiKorpu = () => api.get("/korpa");

export const dodajUKorpu = (proizvodSifra) => api.post("/korpa/dodaj", {proizvodSifra});

export const obrisiStavkuIzKorpe = (stavkaKorpeId) => api.delete(`/korpa/${stavkaKorpeId}`);