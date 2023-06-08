const validateAvisPost = (req, res, next) => {
    const { text } = req.body;
    const errors = [];

    console.log(text)

    if (text == null || text === "") {
        errors.push({ field : "text", message : "Text is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateAvisPost };