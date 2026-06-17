export const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    return axios.post(
        "http://localhost:5000/api/auth/logout",
        { refreshToken }
    );
};