const generateRandomPassword = (req, res, next) => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
  
    req.password = password;

    if (req?.password === "") {
        res.sendStatus(500);
    } else {
        next();
    }
};

module.exports = { generateRandomPassword };