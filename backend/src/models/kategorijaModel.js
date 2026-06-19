const db = require("../db/db");

async function dohvatiSve() {
    const [rows] = await db.query(`
        SELECT
            kategorija_id,
            naziv
        FROM kategorija
        ORDER BY naziv
    `);

    return rows;
}

async function dohvatiPoId(id) {
    const [rows] = await db.query(`
        SELECT
            kategorija_id,
            naziv
        FROM kategorija
        WHERE kategorija_id = ?
    `, [id]);

    return rows[0];
}

module.exports = {
    dohvatiSve,
    dohvatiPoId
};