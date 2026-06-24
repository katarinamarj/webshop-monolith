const porudzbinaService = require("../services/porudzbinaService");

async function kreiraj(req, res) {
    try {
        const porudzbinaId = await porudzbinaService.kreirajPorudzbinu(req.korisnik.korisnikId, req.body);
        res.status(201).json({porudzbinaId});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {
    kreiraj
};