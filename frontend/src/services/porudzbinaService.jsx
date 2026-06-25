import api from "./apiService";

export const kreirajPorudzbinu = (podaci) => {
    return api.post("/porudzbine", podaci);
};