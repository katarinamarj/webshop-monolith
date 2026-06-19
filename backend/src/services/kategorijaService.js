const kategorijaModel = require("../models/kategorijaModel");

async function dohvatiSveKategorije() {
    return await kategorijaModel.dohvatiSve();
}

module.exports = {
    dohvatiSveKategorije
};