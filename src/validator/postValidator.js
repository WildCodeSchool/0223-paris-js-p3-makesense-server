const validatePost = (req, res, next) => {
    const { title, description, profit, risk, avatar } = req.body;
    
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

    if (profit == null || profit === "") {
        errors.push({ field : "profit", message : "This profit is required"})
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