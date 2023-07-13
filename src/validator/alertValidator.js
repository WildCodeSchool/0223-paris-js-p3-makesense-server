const validateAlert = (req, res, next) => {
    const { title } = req.body;
    const errors = [];

    if (title == null || title === "") {
        errors.push({ field : "title", message : "This title is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateAlert };