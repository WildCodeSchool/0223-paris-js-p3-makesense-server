const validatePost = (req, res, next) => {
    const { titre, description, status, profit, risk, avatar } = req.body;
    const errors = [];

    if (titre == null || titre === "") {
        errors.push({ field : "titre", message : "This titre is required"})
    }

    if (description == null || description === "") {
        errors.push({ field : "description", message : "This description is required"})
    }

    if (status == null || status === "") {
        errors.push({ field : "status", message : "This status is required"})
    }

    if (profit == null || profit === "") {
        errors.push({ field : "profit", message : "This profit is required"})
    }

    if (risk == null || risk === "") {
        errors.push({ field : "risk", message : "This risk is required"})
    }

    if (avatar == null || avatar === "") {
        errors.push({ field : "avatar", message : "This avatar is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validatePost };