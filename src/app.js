require('dotenv').config();
const app = require("./config/server.js"); 
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("*", (req, res) => {
  res.redirect("/")
});

app.listen(port, () => {
});

module.exports = app;