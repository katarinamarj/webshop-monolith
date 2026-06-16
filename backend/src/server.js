const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const proizvodRoutes = require("./routes/proizvodRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/proizvodi", proizvodRoutes);

app.listen(5000, () => {
    console.log("Server radi na portu 5000");
});
