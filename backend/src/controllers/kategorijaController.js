const kategorijaService = require("../services/kategorijaService");

async function dohvatiSve(req, res) {
    try {
        const kategorije =await kategorijaService.dohvatiSveKategorije();

        res.status(200).json(kategorije);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    dohvatiSve
};