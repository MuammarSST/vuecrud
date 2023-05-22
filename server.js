const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extend: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/turorial.routes")(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Crud Application" })
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}.`);
});