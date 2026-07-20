const db = require("../db/db");

async function sacuvaj(token, datumIsteka, korisnikId) {
    await db.query(
        `INSERT INTO refreshtoken
        (token, datum_isteka, korisnik_id)
        VALUES (?, ?, ?)`,
        [token, datumIsteka, korisnikId]
    );
}

async function pronadjiPoTokenu(token) {
    const [rows] = await db.query(
        "SELECT * FROM refreshtoken WHERE token = ?",
        [token]
    );
    return rows[0];
}

async function obrisiPoTokenu(token) {
    await db.query(
        "DELETE FROM refreshtoken WHERE token = ?",
        [token]
    );
}

module.exports = {
    sacuvaj,
    pronadjiPoTokenu,
    obrisiPoTokenu
};