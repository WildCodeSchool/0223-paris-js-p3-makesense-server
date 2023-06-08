const { findAll, findOne, createRole, removeRole, modifyRole } = require("../model/roleModel"); 


const getAllRoles = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addRole = (req, res) => {
    const role = req.body;
    createRole(role)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getRole = (req, res) => {
    const id = req.params.id;
    console.log("id --->", id);
    findOne(id)
    .then((data) => {   
        console.log("data", data);
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No role found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const deleteRole = (req, res) => {
    const id = req.params.id;
    removeRole(id)
    .then((data) => {   
        console.log("data.affectedRows", data.affectedRows);
        if (data.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No role found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const editRole = (req, res) => {
    const id = req.params.id;

    const role = req.body;

    modifyRole(role, id)
    .then((data) => {
        if (data.affectedRows === 1) {
            res.json({ id, ...role})
        } else {
            res.status(404).json({ message : "No role found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllRoles, getRole, addRole, deleteRole, editRole };