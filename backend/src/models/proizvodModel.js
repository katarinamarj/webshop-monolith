const db = require("../db/db");

async function dohvatiSve() {
    const [rows] = await db.query(`
        SELECT
            p.sifra,
            p.naziv,
            p.opis,
            p.cena,
            p.dostupna_kolicina,
            p.slika,
            k.naziv AS kategorija
        FROM proizvod p
        JOIN kategorija k
            ON p.kategorija_id = k.kategorija_id
    `);

    return rows;
}

async function pronadjiPoSifri(sifra) {
    const [rows] = await db.query(`
        SELECT
            p.sifra,
            p.naziv,
            p.opis,
            p.cena,
            p.dostupna_kolicina,
            p.slika,
            k.naziv AS kategorija
        FROM proizvod p
        JOIN kategorija k
            ON p.kategorija_id = k.kategorija_id
        WHERE p.sifra = ?
    `, [sifra]);

    return rows[0];
}

module.exports = {
    dohvatiSve,
    pronadjiPoSifri
};