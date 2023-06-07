const validateUserPost = (req, res, next) => {
    const { firstname, lastname, email, password, affiliated_site, tel } = req.body;
    const errors = [];

    if (firstname == null || firstname === "") {
        errors.push({ field : "firstname", message : "This firstname is required"})
    }

    if (lastname == null || lastname === "") {
        errors.push({ field : "lastname", message : "This lastname is required"})
    }

    if (email == null || email === "") {
        errors.push({ field : "email", message : "This email is required"})
    }

    const emailRegex = /[a-z0-9._]+@makesense.org/;

    if (!emailRegex.test(email)) {
        errors.push({ field : "email", message : "Invalid Email"})
    }
    
    if (password == null || password === "") {
        errors.push({ field : "password", message : "This password is required"})
    }

    if (affiliated_site == null || affiliated_site === "") {
        errors.push({ field : "affiliated_site", message : "This affiliated_site is required"})
    }

    if (tel == null || tel === "") {
        errors.push({ field : "tel", message : "This tel is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateUserPost };