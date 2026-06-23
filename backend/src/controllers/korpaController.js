const korpaService = require("../services/korpaService");

async function dodajUKorpu(req, res) {
    try {
        await korpaService.dodajUKorpu(req.korisnik.korisnikId, req.body.proizvodSifra);

        res.status(200).json({message: "Proizvod dodat u korpu"});

    } catch (err) {
        console.error("GRESKA:", err);

        res.status(500).json({message: err.message});
    }
}
async function dohvatiKorpu(req, res) {
    try {
        const korpa = await korpaService.dohvatiKorpu(req.korisnik.korisnikId);

        res.status(200).json(korpa);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function obrisiStavku(req, res) {
    try {
        const stavkaKorpeId = req.params.stavkaKorpeId;

        await korpaService.obrisiStavku(stavkaKorpeId);

        res.status(200).json({message:"Stavka uspesno obrisana."});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    dodajUKorpu,
    dohvatiKorpu,
    obrisiStavku
};