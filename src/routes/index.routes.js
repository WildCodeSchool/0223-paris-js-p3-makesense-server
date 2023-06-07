const router = require('express').Router();
const userRouter = require("./users.routes.js");

router.use('/users', userRouter);

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;