const db = require("../db/db");

async function dohvatiSve() {
    const [rows] = await db.query(`
        SELECT
            sifra,
            naziv,
            opis,
            cena,
            dostupna_kolicina,
            kategorija_id
        FROM proizvod
    `);

    return rows;
}

module.exports = {
    dohvatiSve
};