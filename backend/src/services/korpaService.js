const korpaModel = require("../models/korpaModel");

async function dodajUKorpu(korisnikId, proizvodSifra) {
    let korpa = await korpaModel.pronadjiKorpuPoKorisniku(korisnikId);

    if (!korpa) {
        const korpaId = await korpaModel.kreirajKorpu(korisnikId);

        korpa = {korpa_id: korpaId};
    }

    const stavka = await korpaModel.pronadjiStavku(korpa.korpa_id, proizvodSifra);

    if (stavka) {
        await korpaModel.povecajKolicinu(korpa.korpa_id, proizvodSifra);

    } else {
        await korpaModel.dodajStavku(korpa.korpa_id,proizvodSifra);
    }
}

async function dohvatiKorpu(korisnikId) {
    const korpa = await korpaModel.pronadjiKorpuPoKorisniku(korisnikId);

    if (!korpa) {
        return [];
    }

    return await korpaModel.dohvatiKorpu(korpa.korpa_id);
}

async function obrisiStavku(stavkaKorpeId) {

    await korpaModel.obrisiStavku(stavkaKorpeId);
}

module.exports = {
    dodajUKorpu,
    dohvatiKorpu,
    obrisiStavku
};