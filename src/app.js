require('dotenv').config();
const app = require("./config/server.js"); 
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.listen(port, () => {
  console.log("Serveur open PORT :", port)
});

module.exports = app;