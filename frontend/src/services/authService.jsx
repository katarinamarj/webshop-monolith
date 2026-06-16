import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registracija = (podaci) => {
    return axios.post(`${API_URL}/registracija`, podaci);
};

export const prijava = async (podaci) => {
    const response = await axios.post(
        `${API_URL}/prijava`,
        podaci
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
};

export const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    await axios.post(`${API_URL}/logout`, {
        refreshToken
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};