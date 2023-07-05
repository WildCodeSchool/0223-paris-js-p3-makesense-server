const validateUserPost = (req, res, next) => {
    const { firstname, lastname, email, password, role_id, job_id } = req.body;
    const errors = [];

    if (firstname == null || firstname === "") {
        errors.push({ field : "firstname", message : "This firstname is required"})
    }
    
    const firstnameRegex = /[-,a-zA-ZÀ-ÿ ']{2,}/;

    if (!firstnameRegex.test(firstname)){
    errors.push({ field : "firstname", message : "invalid firstname"})
    }

    if (lastname == null || lastname === "") {
        errors.push({ field : "lastname", message : "This lastname is required"})
    }

    const lastnameRegex = /[-,a-zA-ZÀ-ÿ ']{2,}/;

    if (!lastnameRegex.test(lastname)){
    errors.push({ field : "lastname", message : "invalid lastname"})
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

    if (role_id == null || role_id === "") {
        errors.push({ field : "role_id", message : "This role is required"})
    }

    if (job_id == null || job_id === "") {
        errors.push({ field : "job_id", message : "This job is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateUserPost };