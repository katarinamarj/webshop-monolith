const porudzbinaService = require("../services/porudzbinaService");

async function kreiraj(req, res) {
    try {
        const porudzbinaId = await porudzbinaService.kreirajPorudzbinu(req.korisnik.korisnikId, req.body);
        res.status(201).json({porudzbinaId});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function mojePorudzbine(req, res) {
    try {
        const porudzbine = await porudzbinaService.dohvatiMojePorudzbine(req.korisnik.korisnikId);
        res.json(porudzbine);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function detalji(req,res) {
    try {
        const porudzbina = await porudzbinaService.dohvatiPorudzbinu(req.params.id);
        res.json(porudzbina);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function dohvatiSve(req, res) {
    try {
        const porudzbine = await porudzbinaService.dohvatiSvePorudzbine();
        res.json(porudzbine);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function promeniStatus(req, res) {
    try {
        await porudzbinaService.promeniStatus(
            req.params.id,
            req.body.status
        );

        res.json({ message: "Status uspešno promenjen."});
    } catch (err) {
        res.status(400).json({ message: err.message});
    }

}

module.exports = {
    kreiraj,
    mojePorudzbine,
    detalji,
    dohvatiSve,
    promeniStatus
};