const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const korisnikModel = require("../models/korisnikModel");
const refreshTokenModel = require("../models/refreshTokenModel");

async function registracija(podaci) {
    const postojeci = await korisnikModel.pronadjiPoEmail(
        podaci.email
    );

    if (postojeci) {
        throw new Error("Email već postoji.");
    }

    const hashLozinka = await bcrypt.hash(
        podaci.lozinka,
        10
    );

    return await korisnikModel.kreiraj({
        ime: podaci.ime,
        prezime: podaci.prezime,
        email: podaci.email,
        lozinka: hashLozinka,
        uloga: "korisnik"
    });
}

async function prijava(email, lozinka) {
    const korisnik = await korisnikModel.pronadjiPoEmail(email);

    if (!korisnik) {
        throw new Error("Pogrešan email ili lozinka.");
    }

    const istaLozinka = await bcrypt.compare(
        lozinka,
        korisnik.lozinka
    );

    if (!istaLozinka) {
        throw new Error("Pogrešan email ili lozinka.");
    }

    const accessToken = jwt.sign(
        {
            korisnikId: korisnik.korisnik_id,
            email: korisnik.email,
            uloga: korisnik.uloga
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    const refreshToken = jwt.sign(
    {
        korisnikId: korisnik.korisnik_id,
        email: korisnik.email,
        uloga: korisnik.uloga
    },
    process.env.JWT_REFRESH_SECRET,
    {
        expiresIn: "7d"
    }
);

    const datumIsteka = new Date();
    datumIsteka.setDate(datumIsteka.getDate() + 7);

    await refreshTokenModel.sacuvaj(
        refreshToken,
        datumIsteka,
        korisnik.korisnik_id
    );

    return {
        accessToken,
        refreshToken,
        uloga: korisnik.uloga
    };
}

async function logout(refreshToken) {
    if (!refreshToken) {
        throw new Error("Refresh token nije prosleđen.");
    }

    const postojeci =
        await refreshTokenModel.pronadjiPoTokenu(refreshToken);

    if (!postojeci) {
        throw new Error("Neispravan refresh token.");
    }

    await refreshTokenModel.obrisiPoTokenu(refreshToken);
}


module.exports = {
    registracija,
    prijava,
    logout
};