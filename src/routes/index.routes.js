const router = require('express').Router();
const userRouter = require("./users.routes.js");
const avisRouter = require("./avis.routes.js");

router.use('/users', userRouter);
router.use('/avis', avisRouter);

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;