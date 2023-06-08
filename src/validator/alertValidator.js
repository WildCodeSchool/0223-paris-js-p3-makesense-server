const validateAlert = (req, res, next) => {
    const { title , text } = req.body;
    const errors = [];

    if (title == null || title === "") {
        errors.push({ field : "title", message : "This title is required"})
    }
    if (text == null || text === "") {
        errors.push({ field : "text", message : "This text is required"})
    }
    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateAlert };