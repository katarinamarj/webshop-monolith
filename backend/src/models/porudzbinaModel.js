const db = require("../db/db");

async function kreiraj(korisnikId, podaciId, ukupanIznos) {
    const [result] = await db.query(
            `
            INSERT INTO porudzbina
            (
                datum,
                status,
                ukupan_iznos,
                korisnik_id,
                podaci_za_isporuku_id
            )
            VALUES
            (
                NOW(),
                'placena',
                ?,
                ?,
                ?
            )
            `,
            [
                ukupanIznos,
                korisnikId,
                podaciId
            ]
        );

    return result.insertId;
}

async function kreirajPodatkeZaIsporuku(podaci) {
    const [result] = await db.query(
            `
            INSERT INTO podacizaisporuku
            (
                ulica,
                grad,
                postanski_broj,
                telefon
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                podaci.ulica,
                podaci.grad,
                podaci.postanskiBroj,
                podaci.telefon
            ]
        );

    return result.insertId;
}

async function dodajStavkuPorudzbine(porudzbinaId, proizvodSifra, kolicina, cena) {
    const [max] = await db.query(
            `
            SELECT
                COALESCE(
                    MAX(stavka_porudzbine_id),
                    0
                ) + 1 AS noviId
            FROM stavkaporudzbine
            `
        );

    const stavkaId = max[0].noviId;

    await db.query(
        `
        INSERT INTO stavkaporudzbine
        (
            stavka_porudzbine_id,
            porudzbina_id,
            kolicina,
            cena,
            sifraProizvoda
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            stavkaId,
            porudzbinaId,
            kolicina,
            cena,
            proizvodSifra
        ]
    );
}

async function smanjiStanjeProizvoda(sifra, kolicina) {
    await db.query(
        `
        UPDATE proizvod
        SET dostupna_kolicina =
            dostupna_kolicina - ?
        WHERE sifra = ?
        `,
        [
            kolicina,
            sifra
        ]
    );
}

async function kreirajPlacanje(porudzbinaId, iznos) {
    await db.query(
        `
        INSERT INTO placanje
        (
            datum,
            status,
            iznos,
            porudzbina_id
        )
        VALUES
        (
            NOW(),
            'uspesno',
            ?,
            ?
        )
        `,
        [
            iznos,
            porudzbinaId
        ]
    );
}

async function dohvatiPoKorisniku(korisnikId) {
    const [rows] = await db.query(
        `
        SELECT
            porudzbina_id,
            datum,
            status,
            ukupan_iznos
        FROM porudzbina
        WHERE korisnik_id = ?
        ORDER BY datum DESC
        `,
        [korisnikId]
    );

    return rows;
}

async function dohvatiDetalje(porudzbinaId) {
    const [rows] = await db.query(
        `
        SELECT
            p.porudzbina_id,
            p.datum,
            p.status,
            p.ukupan_iznos,

            pi.ulica,
            pi.grad,
            pi.postanski_broj,
            pi.telefon

        FROM porudzbina p

        JOIN podacizaisporuku pi
            ON p.podaci_za_isporuku_id =
               pi.podaci_za_isporuku_id

        WHERE p.porudzbina_id = ?
        `,
        [porudzbinaId]
    );

    return rows[0];
}

async function dohvatiStavke(porudzbinaId) {
    const [rows] = await db.query(
        `
        SELECT
            sp.kolicina,
            sp.cena,

            pr.sifra,
            pr.naziv,
            pr.slika

        FROM stavkaporudzbine sp

        JOIN proizvod pr
            ON sp.sifraProizvoda =
               pr.sifra

        WHERE sp.porudzbina_id = ?
        `,
        [porudzbinaId]
    );

    return rows;
}

async function dohvatiSve() {
    const [rows] = await db.query(`
        SELECT
            p.porudzbina_id,
            p.datum,
            p.status,
            p.ukupan_iznos,
            k.ime,
            k.prezime,
            k.email,
            pi.ulica,
            pi.grad,
            pi.postanski_broj,
            pi.telefon
        FROM porudzbina p
        JOIN korisnik k
            ON p.korisnik_id = k.korisnik_id
        JOIN podacizaisporuku pi
            ON p.podaci_za_isporuku_id =
               pi.podaci_za_isporuku_id
        ORDER BY p.datum DESC
    `);

    return rows;
}

async function promeniStatus(porudzbinaId, status) {
    await db.query(`
        UPDATE porudzbina
        SET status = ?
        WHERE porudzbina_id = ?
    `,[status, porudzbinaId]);

}

module.exports = {
    kreiraj,
    kreirajPodatkeZaIsporuku,
    dodajStavkuPorudzbine,
    smanjiStanjeProizvoda,
    kreirajPlacanje,
    dohvatiPoKorisniku,
    dohvatiDetalje,
    dohvatiStavke,
    dohvatiSve,
    promeniStatus
};