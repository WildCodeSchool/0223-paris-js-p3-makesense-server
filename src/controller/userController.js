const { findAll, findOne, removeUser, modifyUser, getByEmail, createUserAdmin, updateOneByMail, countAll } = require("../model/userModel"); 
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {sendResetPasswordMail, createAccountMail} = require("../helpers/mailer");

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

const getAllCountUsers = async (req, res) => {
    try {
    const [datagetAllUsers] = await countAll();
    if (datagetAllUsers.length !== 0) {
        res.status(200).json(datagetAllUsers)
    } else {
        res.status(404).json({error : "No Users"});
    }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const user = await findOne(req.idUser);
        const MapUserPassword =  user.map(data => {
            return {
                id : data.id,
                firstname : data.firstname,
                lastname : data.lastname,
                email : data.email,
                avatar : data.avatar,
                affiliated_site : data.affiliated_site,
                tel : data.tel,
                job_id : data.job_id,
                role_id : data.role_id,
                admin : data.admin
            }
        })
        res.status(200).json(MapUserPassword[0]);
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
    const id = req.idUser;

    const data = req.body;

    try {

        const users = await findAll();
        const filterDataEmail = users.filter(user => user.email === data?.email)

        if (filterDataEmail) {
            if (filterDataEmail[0]?.id != undefined && filterDataEmail[0]?.id != id) return res.status(400).json({ message : "Email doublon"})
        }
        
        if (req.file) {
            const uploadedFilePath = await req.protocol + "://" + req.get("host") + "/upload/user/" + req.file.filename;
            data.avatar = await uploadedFilePath;
        }

        const dataEditUser = await modifyUser(data, id);
        if (dataEditUser.affectedRows === 1) {
            const [user] = await findOne(req.idUser)
            res.json({...user});
        } else {
            res.status(404).json({ message : "No user found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editUserAdmin = async  (req, res) => {
    const id = req.params.id;

    const data = req.body;

    try {

        const users = await findAll();
        const filterDataEmail = users.filter(user => user.email === data?.email)

        if (filterDataEmail) {
            if (filterDataEmail[0]?.id != undefined && filterDataEmail[0]?.id != id) return res.status(400).json({ message : "Email doublon"})
        }

        if (req.file) {
            const uploadedFilePath = await req.protocol + "://" + req.get("host") + "/upload/user/" + req.file.filename;
            data.avatar = await uploadedFilePath;
        }

        const dataEditUser = await modifyUser(data, id);
        if (dataEditUser.affectedRows === 1) {
            const [user] = await findOne(req.idUser)
            res.json({...user});
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
        const { lastname, firstname, email, avatar, job_id, role_id } = req.body;
        const { password } = req; 
        const filePath = `${process.env.BACKEND_URL}/upload/user/default_user.png`;
        if (avatar) {
            if (!req.file) return res.status(403).json("a error occured during the upload");
            filePath = req.protocol + "://" + req.get("host") + "/upload/user/" + req.file.filename;
        }
        const user = await getByEmail(email);
        if (user.length !== 0)  return res.status(400).json("email already exists");
        req.password = await argon.hash(password);
        const newBody = {...req.body, admin: req.body?.admin ? req.body.admin : "0", avatar : filePath, password : req.password};
        const result = await createUserAdmin(newBody);
        const sendMailAccount = await createAccountMail({ email, password });
        res.status(201).json({ id: result.insertId, lastname, firstname, email, avatar : filePath, job_id, role_id, sendMailAccount}); 
    } catch (err) {
        console.log('err', err)
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json("Please specify both email and password");

    try {
        const [user] = await getByEmail(email);
        if (!user) return res.status(400).json("Invalid email");
        if (await argon.verify(user.password, password)) {
            const token = jwt.sign({id: user.id, role: user.role_id, job: user.job_id, admin: user.admin }, process.env.JWT_AUTH_SECRET, {expiresIn: "3h"});
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
        const resetToken = jwt.sign({ email }, process.env.JWT_AUTH_SECRET, { expiresIn: '15m' });
        const url = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`;
        const result = await sendResetPasswordMail({ dest: email, url, duree: "15min" });
        res.status(200).json({result});
    } catch (error) {
        console.log("error", error)
        next(error);
    }

}

const resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        const hash = await argon.hash(password);
        const users = await findAll();
        const [filterDataEmail] = users.filter(user => user.email === decoded?.email)
        const checkPassWorld = await argon.verify(filterDataEmail.password, password);
        if (checkPassWorld) {
            res.status(400).json({error : "Password identical"});
        }
        await updateOneByMail({password: hash}, decoded.email);
        delete decoded?.email;
        res.status(204);
    } catch (error) {
        console.log("error", error)
        next(error);
    }
}

const verifyToken = (req, res, next) => {
    const { token } = req.body;
  
    try {
      jwt.verify(token, process.env.JWT_AUTH_SECRET);
      res.status(200).json({ valid: true });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
};

module.exports = { getAllUsers, getUser, deleteUser, editUser, register,login, logout, getCurrentUser, sendResetPassword, resetPassword, getAllCountUsers, editUserAdmin, verifyToken};