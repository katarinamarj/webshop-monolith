const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = require("./db/db");

db.query("SELECT 1")
    .then(() => console.log("Baza povezana"))
    .catch(err => console.error("Greška pri povezivanju:", err));


app.get("/api/test", (req, res) => {
    res.json({ message: "Backend radi!" });
});

app.listen(5000, () => {
    console.log("Server radi na portu 5000");
});
