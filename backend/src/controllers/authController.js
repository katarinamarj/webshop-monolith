const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshTokenModel");

async function registracija(req, res) {
    try {
        const korisnikId =
            await authService.registracija(req.body);

        res.status(201).json({
            message: "Uspešna registracija.",
            korisnikId
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

async function prijava(req, res) {
    try {
        const { email, lozinka } = req.body;

        const tokeni = await authService.prijava(
            email,
            lozinka
        );

        res.status(200).json(tokeni);
    } catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
}

async function logout(req, res) {
    try {
        const { refreshToken } = req.body;

        await authService.logout(refreshToken);

        res.status(200).json({
            message: "Uspešno ste se odjavili."
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

async function refreshToken(req, res) {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token nije prosleđen."
        });
    }

    const tokenIzBaze =
        await refreshTokenModel.pronadjiPoTokenu(
            refreshToken
        );

    if (!tokenIzBaze) {
        return res.status(401).json({
            message: "Nevazeci refresh token."
        });
    }

    try {

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const noviAccessToken =
            jwt.sign(
                {
                    korisnikId: decoded.korisnikId,
                    email: decoded.email,
                    uloga: decoded.uloga
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "15m"
                }
            );

        res.json({
            accessToken: noviAccessToken
        });

    } catch (err) {

        return res.status(401).json({
            message: "Refresh token istekao."
        });
    }
}

module.exports = {
    registracija,
    prijava,
    logout,
    refreshToken
};