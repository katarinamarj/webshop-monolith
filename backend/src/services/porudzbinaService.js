const porudzbinaModel = require("../models/porudzbinaModel");

const korpaModel = require("../models/korpaModel");

async function kreirajPorudzbinu(korisnikId, podaci) {
    const korpa = await korpaModel.pronadjiKorpuPoKorisniku(korisnikId);

    if (!korpa) {
        throw new Error("Korpa ne postoji.");
    }

    const stavke = await korpaModel.dohvatiKorpu(korpa.korpa_id);

    if (stavke.length === 0) {
        throw new Error("Korpa je prazna.");
    }

    const podaciZaIsporukuId = await porudzbinaModel.kreirajPodatkeZaIsporuku({
            ulica: podaci.ulica,
            grad: podaci.grad,
            postanskiBroj: podaci.postanskiBroj,
            telefon: podaci.telefon
        });

    const ukupanIznos = stavke.reduce((sum, stavka) => sum + stavka.cena * stavka.kolicina, 0);

    const porudzbinaId = await porudzbinaModel.kreiraj(korisnikId, podaciZaIsporukuId, ukupanIznos);

    for (const stavka of stavke) {
        await porudzbinaModel.dodajStavkuPorudzbine(
            porudzbinaId,
            stavka.sifra,
            stavka.kolicina,
            stavka.cena
        );
        await porudzbinaModel.smanjiStanjeProizvoda(
            stavka.sifra,
            stavka.kolicina
        );
    }

    await porudzbinaModel.kreirajPlacanje(porudzbinaId, ukupanIznos);

    await korpaModel.isprazniKorpu(korpa.korpa_id);

    return porudzbinaId;
}

async function dohvatiMojePorudzbine(korisnikId) {
    const porudzbine = await porudzbinaModel.dohvatiPoKorisniku(korisnikId);

    for (const porudzbina of porudzbine) {
        porudzbina.stavke = await porudzbinaModel.dohvatiStavke(porudzbina.porudzbina_id);
    }

    return porudzbine;
}

async function dohvatiPorudzbinu(porudzbinaId) {
    const porudzbina = await porudzbinaModel.dohvatiDetalje(porudzbinaId);
    const stavke = await porudzbinaModel.dohvatiStavke(porudzbinaId);

    return {...porudzbina,stavke};
}

module.exports = {
    kreirajPorudzbinu,
    dohvatiMojePorudzbine,
    dohvatiPorudzbinu
};