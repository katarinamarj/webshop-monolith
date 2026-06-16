const proizvodModel = require("../models/proizvodModel");

async function dohvatiSve() {
    return await proizvodModel.dohvatiSve();
}

async function dohvatiPoSifri(sifra) {
    const proizvod = await proizvodModel.pronadjiPoSifri(sifra);

    if (!proizvod) {
        throw new Error("Proizvod nije pronađen.");
    }

    return proizvod;
}

module.exports = {
    dohvatiSve,
    dohvatiPoSifri
};