const proizvodModel = require("../models/proizvodModel");

async function dohvatiSve() {
    return await proizvodModel.dohvatiSve();
}

module.exports = {
    dohvatiSve
};