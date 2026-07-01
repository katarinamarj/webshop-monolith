import api from "./apiService";

export function dohvatiSvePorudzbine() {
    return api.get("/porudzbine/admin");
}

export function promeniStatus(id, status) {
    return api.put(`/porudzbine/${id}/status`, { status });
}