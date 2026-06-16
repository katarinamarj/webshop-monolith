const proizvodService = require("../services/proizvodService");

async function dohvatiSve(req, res) {
    try {
        const proizvodi = await proizvodService.dohvatiSve();

        res.status(200).json(proizvodi);

    } catch (err) {
        res.status(500).json({
            message: "Greška pri dohvatanju proizvoda."
        });

    }
}

async function dohvatiPoSifri(req, res) {
    try {
        const proizvod = await proizvodService.dohvatiPoSifri(req.params.sifra);

        res.status(200).json(proizvod);

    } catch (err) {

        res.status(404).json({
            message: err.message
        });

    }
}

module.exports = {
    dohvatiSve,
    dohvatiPoSifri
};