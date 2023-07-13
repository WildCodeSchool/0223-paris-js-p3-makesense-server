const { findAll, findOne, removeUser, modifyUser, getByEmail, createUserAdmin, updateOneByMail } = require("../model/userModel"); 
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {sendResetPasswordMail} = require("../helpers/mailer");

const getAllUsers = async (req, res) => {
    try {
        const datagetAllUsers = await findAll();

        if (datagetAllUsers.length !== 0) {
            res.status(200).json(datagetAllUsers)
        } else {
            res.status(404).json({error : "No users"});
        }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const [user] = await findOne(req.idUser);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}


const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetUser = await findOne(id);
        res.status(201).json(dataGetUser)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const dataDeleteUser = await removeUser(id);
        if (dataDeleteUser.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No user found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editUser = async  (req, res) => {
    const id = req.params.id;

    const user = req.body;

    try {

        if (req.file) {
            const uploadedFilePath = await req.protocol + "://" + req.get("host") + "/upload/user/" + req.file.filename;
            user.avatar = await uploadedFilePath;
        }

        const dataEditUser = await modifyUser(user, id);
        if (dataEditUser.affectedRows === 1) {
            res.json({ id, ...user})
        } else {
            res.status(404).json({ message : "No user found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}
 
const register = async (req, res) => {
    try {
        const { lastname, firstname, email, password, avatar, job_id, role_id } = req.body;
        const filePath = `${process.env.BACKEND_URL}/upload/user/default_user.png`;
        if (avatar) {
            if (!req.file) return res.status(400).json("a error occured during the upload");
            filePath = req.protocol + "://" + req.get("host") + "/upload/user/" + req.file.filename;
        }
        const user = await getByEmail(req.body.email);
        if (user.lenght === 0) return res.status(400).json("email already exists");
        req.body.password = await argon.hash(req.body.password);
        const newBody = {...req.body, admin: req.body?.admin ? req.body.admin : "0", avatar : filePath};
        const result = await createUserAdmin(newBody);
        res.status(201).json({ id: result.insertId, lastname, firstname, email, password, avatar : filePath, job_id, role_id  });

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json("Please specify both email and password");

    try {
        const [user] = await getByEmail(email);
        if (!user) return res.status(400).json("Invalid email");
        if (await argon.verify(user.password, password)) {
            const token = jwt.sign({id: user.id, role: user.role_id, job: user.job_id, admin: user.admin}, process.env.JWT_AUTH_SECRET, {expiresIn: "1h"});
            res.cookie("access_token", token, {httpOnly: true, secure: process.env.NODE_ENV == "production"}).status(200).json({email, id: user.id, role: user.role, avatar: user.avatar, job: user.job_id, admin: user.admin});
        } 
        else
            res.status(400).json("invalid password");
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }

}

const logout = ({res}) => {
    res.clearCookie("access_token").sendStatus(200);
}

const sendResetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const resetToken = jwt.sign({ email }, process.env.JWT_AUTH_SECRET);
        const url = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`;
        const result = await sendResetPasswordMail({ dest: email, url });
        res.sendStatus(200).json({result});
    } catch (error) {
        next(error);
    }

}

const resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        const hash = await argon.hash(password);
        await updateOneByMail({password: hash}, decoded.email);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getUser, deleteUser, editUser, register,login, logout, getCurrentUser, sendResetPassword, resetPassword};