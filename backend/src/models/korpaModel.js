const db = require("../db/db");

async function pronadjiKorpuPoKorisniku(korisnikId) {

    const [rows] = await db.query(`
        SELECT *
        FROM korpa
        WHERE korisnik_id = ?
    `, [korisnikId]);

    return rows[0];
}

async function kreirajKorpu(korisnikId) {

    const [result] = await db.query(`
        INSERT INTO korpa (korisnik_id)
        VALUES (?)
    `, [korisnikId]);

    return result.insertId;
}

async function pronadjiStavku(korpaId, proizvodSifra) {
    const [rows] = await db.query(`
        SELECT *
        FROM stavka_korpe
        WHERE korpa_id = ?
        AND proizvod_sifra = ?
    `, [korpaId, proizvodSifra]);

    return rows[0];
}

async function dodajStavku(korpaId, proizvodSifra) {
    await db.query(`
        INSERT INTO stavka_korpe
        (
            korpa_id,
            proizvod_sifra,
            kolicina
        )
        VALUES (?, ?, 1)
    `, [korpaId, proizvodSifra]);
}

async function povecajKolicinu(korpaId, proizvodSifra) {
    await db.query(`
        UPDATE stavka_korpe
        SET kolicina = kolicina + 1
        WHERE korpa_id = ?
        AND proizvod_sifra = ?
    `, [korpaId, proizvodSifra]);
}

async function dohvatiKorpu(korpaId) {
    const [rows] = await db.query(`
        SELECT
            sk.stavka_korpe_id,
            p.sifra,
            p.naziv,
            p.cena,
            p.slika,
            sk.kolicina
        FROM stavka_korpe sk
        JOIN proizvod p
            ON sk.proizvod_sifra = p.sifra
        WHERE sk.korpa_id = ?
    `, [korpaId]);

    return rows;
}

async function obrisiStavku(stavkaKorpeId) {
    const sql = `
        DELETE FROM stavka_korpe
        WHERE stavka_korpe_id = ?
    `;

    await db.execute(sql, [stavkaKorpeId]);
}

async function isprazniKorpu(korpaId) {
    await db.query(
        `
        DELETE FROM stavka_korpe
        WHERE korpa_id = ?
        `,
        [korpaId]
    );
}

module.exports = {
    pronadjiKorpuPoKorisniku,
    kreirajKorpu,
    pronadjiStavku,
    dodajStavku,
    povecajKolicinu,
    dohvatiKorpu,
    obrisiStavku,
    isprazniKorpu
};