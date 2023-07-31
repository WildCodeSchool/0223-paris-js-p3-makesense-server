const validateUserPost = (req, res, next) => {
    const { firstname, lastname, email, affiliated_site, tel} = req.body;
    const { password } = req;
    const errors = [];

    if (firstname == null || firstname === "") {
        errors.push({ field : "firstname", message : "This firstname is required"})
    }

    if (firstname.length > 45) {
        errors.push({ field : "firstname - FORMAT LIMIT", message : "Character firstname limit error exceeded (45)"})
    }

    const firstnameRegex = /^[-,a-zA-ZÀ-ÿ ']*$/;

    if (!firstnameRegex.test(firstname)){
    errors.push({ field : "firstname - FORMAT INCORRECT", message : "invalid firstname"})
    }

    if (lastname == null || lastname === "") {
        errors.push({ field : "lastname", message : "This lastname is required"})
    }

    if (lastname.length > 45) {
        errors.push({ field : "lastname - FORMAT LIMIT", message : "Character lastname limit error exceeded (45)"})
    }

    const lastnameRegex = /^[-,a-zA-ZÀ-ÿ ']*$/;

    if (!lastnameRegex.test(lastname)){
    errors.push({ field : "lastname - FORMAT INCORRECT", message : "invalid lastname"})
    }

    if (email == null || email === "") {
        errors.push({ field : "email", message : "This email is required"})
    }

    if (email.length > 45) {
        errors.push({ field : "email - FORMAT LIMIT", message : "Character email limit error exceeded (45)"})
    }
    
    if (password == null || password === "") {
        errors.push({ field : "password", message : "This password is required"})
    }

    if (affiliated_site) {
        if (affiliated_site.length > 45) {
            errors.push({ field : "affiliated_site - FORMAT LIMIT", message : "Character affiliated_site limit error exceeded (45)"})
        }
    
        const affiliated_siteRegex = /[-,a-zA-ZÀ-ÿ ']{2,}/;
    
        if (!affiliated_siteRegex.test(affiliated_site)){
        errors.push({ field : "affiliated_siteRegex - FORMAT INCORRECT", message : "invalid affiliated_siteRegex"})
        }
    }

    if (tel) {
        if (tel.length > 45) {
            errors.push({ field : "tel - FORMAT LIMIT", message : "Character tel limit error exceeded (45)"})
        }
    
        const telRegex = /(\d{2})(?=\d)/g;
    
        if (!telRegex.test(tel)){
        errors.push({ field : "tel - FORMAT INCORRECT", message : "invalid tel"})
        }
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

const validateUserPut = (req, res, next) => {
    const { firstname, lastname, email, affiliated_site, tel} = req.body;
    const errors = [];

    if (firstname == null || firstname === "") {
        errors.push({ field : "firstname", message : "This firstname is required"})
    }
    
    const firstnameRegex = /^[-,a-zA-ZÀ-ÿ ']*$/;

    if (!firstnameRegex.test(firstname)){
    errors.push({ field : "firstname", message : "invalid firstname"})
    }

    if (lastname == null || lastname === "") {
        errors.push({ field : "lastname", message : "This lastname is required"})
    }

    const lastnameRegex = /^[-,a-zA-ZÀ-ÿ ']*$/;

    if (!lastnameRegex.test(lastname)){
    errors.push({ field : "lastname", message : "invalid lastname"})
    }

    if (email == null || email === "") {
        errors.push({ field : "email", message : "This email is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }

    if (tel) {
        if (tel.length > 45) {
            errors.push({ field : "tel - FORMAT LIMIT", message : "Character tel limit error exceeded (45)"})
        }
    
        const telRegex = /(\d{2})(?=\d)/g;
    
        if (!telRegex.test(tel)){
        errors.push({ field : "tel - FORMAT INCORRECT", message : "invalid tel"})
        }
    }
}

module.exports = { validateUserPost, validateUserPut };