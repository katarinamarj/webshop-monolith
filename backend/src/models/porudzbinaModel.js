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

module.exports = {
    kreiraj,
    kreirajPodatkeZaIsporuku,
    dodajStavkuPorudzbine,
    smanjiStanjeProizvoda,
    kreirajPlacanje
};