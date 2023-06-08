const { findAll, findOne, createUser, removeUser, modifyUser } = require("../model/userModel"); 


const getAllUsers = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addUser = (req, res) => {
    const user = req.body;
    createUser(user)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getUser = (req, res) => {
    const id = req.params.id;
    findOne(id)
    .then((data) => {   
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No user found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    removeUser(id)
    .then((data) => {   
        if (data.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No user found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const editUser = (req, res) => {
    const id = req.params.id;

    const user = req.body;

    modifyUser(user, id)
    .then((data) => {
        if (data.affectedRows === 1) {
            res.json({ id, ...user})
        } else {
            res.status(404).json({ message : "No user found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllUsers, getUser, addUser, deleteUser, editUser };