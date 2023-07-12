const router = require('express').Router();
const userRouter = require("./usersRoutes.js");
const postRouter = require("./postsRoutes.js");
const jobRouter = require("./jobsRoutes.js");
const roleRouter = require("./rolesRoutes.js");
const alertRouter = require("./alertsRoutes.js");
const avisRouter = require("./avisRoutes.js");

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/roles', roleRouter);
router.use('/alerts', alertRouter);
router.use('/avis', avisRouter);
router.use('/jobs', jobRouter);

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;