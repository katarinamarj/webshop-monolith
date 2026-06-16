const proizvodService = require("../services/proizvodService");

exports.dohvatiSve = async (req, res) => {
    try {
        const proizvodi = await proizvodService.dohvatiSve();

        res.json(proizvodi);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Greška pri dohvatanju proizvoda."
        });
    }
};