const router = require('express').Router();
const userRouter = require("./users.routes.js");
const jobRouter = require("./jobs.routes.js")

router.use('/users', userRouter);
router.use('/jobs', jobRouter)

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;