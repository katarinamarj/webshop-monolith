const db = require("../db/db");

async function sacuvaj(token, datumIsteka, korisnikId) {
    await db.query(
        `INSERT INTO RefreshToken
        (token, datum_isteka, korisnik_id)
        VALUES (?, ?, ?)`,
        [token, datumIsteka, korisnikId]
    );
}

async function pronadjiPoTokenu(token) {
    const [rows] = await db.query(
        "SELECT * FROM RefreshToken WHERE token = ?",
        [token]
    );
    return rows[0];
}

async function obrisiPoTokenu(token) {
    await db.query(
        "DELETE FROM RefreshToken WHERE token = ?",
        [token]
    );
}

module.exports = {
    sacuvaj,
    pronadjiPoTokenu,
    obrisiPoTokenu
};