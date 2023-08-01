const validateRoleName = (req, res, next) => {
    const { name } = req.body;
    const errors = [];

    if (name == null || name === "") {
        errors.push({ field : "name", message : "This name is required"})
    }

    if(name.length > 45) {
        errors.push({ field : "name - FORMAT LIMIT", message : "Character name limit error exceeded (45)"})
    }

    const roleRegex = /^[-,a-zA-ZÀ-ÿ ']*$/;

    if (!roleRegex.test(name)){
    errors.push({ field : "name - FORMAT INCORECT", message : "invalid FORMAT"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateRoleName };