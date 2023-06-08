const router = require('express').Router();
const userRouter = require("./users.routes.js");
const postRouter = require("./posts.routes.js");
const tagRouter = require("./tags.routes.js");

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/tags', tagRouter);

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;