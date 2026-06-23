const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const proizvodRoutes = require("./routes/proizvodRoutes");
const kategorijaRoutes = require("./routes/kategorijaRoutes");
const korpaRoutes = require("./routes/korpaRoutes");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/proizvodi", proizvodRoutes);
app.use("/api/kategorije", kategorijaRoutes);
app.use("/uploads",
    express.static(
        path.join(__dirname, "../uploads/proizvodi")
    )
);
app.use("/api/korpa", korpaRoutes);

app.listen(5000, () => {
    console.log("Server radi na portu 5000");
});
