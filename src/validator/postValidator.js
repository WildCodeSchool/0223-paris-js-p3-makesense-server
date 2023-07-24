const validatePost = (req, res, next) => {
    const { title, description, status, profit, risk, location } = req.body;
    const errors = [];

    if (title == null || title === "") {
        errors.push({ field : "title", message : "This title is required"})
    }

    if(title.length > 100) {
        errors.push({ field : "title - FORMAT LIMIT", message : "Character title limit error exceeded (100)"})
    }

    if (description == null || description === "") {
        errors.push({ field : "description", message : "This description is required"})
    }

    if (status == null || status === "") {
        errors.push({ field : "status", message : "This status is required"})
    }

    if(status.length > 45) {
        errors.push({ field : "status - FORMAT LIMIT", message : "Character status limit error exceeded (45)"})
    }

    if (profit == null || profit === "") {
        errors.push({ field : "profit", message : "This profit is required"})
    }

    if (location == null || location === "") {
        errors.push({ field : "location", message : "This location is required"})
    }

    if (location.length > 100) {
        errors.push({ field : "location", message : "Character title limit error exceeded (45)"})
    }

    if (risk == null || risk === "") {
        errors.push({ field : "risk", message : "This risk is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validatePost };