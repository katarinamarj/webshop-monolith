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
            p.kategorija_id,
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
            p.kategorija_id,
            k.naziv AS kategorija
        FROM proizvod p
        JOIN kategorija k
            ON p.kategorija_id = k.kategorija_id
        WHERE p.sifra = ?
    `, [sifra]);

    return rows[0];
}

async function smanjiKolicinu(sifra,kolicina) {
    await db.query(
        `
        UPDATE proizvod
        SET dostupna_kolicina =
            dostupna_kolicina - ?
        WHERE sifra = ?
        `,
        [kolicina, sifra]
    );
}

module.exports = {
    dohvatiSve,
    pronadjiPoSifri,
    smanjiKolicinu
};