const db = require("../db/db");

async function pronadjiPoEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM Korisnik WHERE email = ?",
        [email]
    );
    return rows[0];
}

async function kreiraj(korisnik) {
    const [result] = await db.query(
        `INSERT INTO Korisnik
        (ime, prezime, email, lozinka, uloga)
        VALUES (?, ?, ?, ?, ?)`,
        [
            korisnik.ime,
            korisnik.prezime,
            korisnik.email,
            korisnik.lozinka,
            korisnik.uloga
        ]
    );
    return result.insertId;
}

module.exports = {
    pronadjiPoEmail,
    kreiraj
};