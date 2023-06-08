const validateRoleName = (req, res, next) => {
    const { name } = req.body;
    const errors = [];

    if (name == null || name === "") {
        errors.push({ field : "name", message : "This name is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateRoleName };