const authService = require("../services/authService");

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

module.exports = {
    registracija,
    prijava,
    logout
};