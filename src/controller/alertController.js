const { findAll, findOne, createAlert, removeAlert, modifyAlert } = require("../model/alertModel"); 


const getAllAlerts = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addAlert = (req, res) => {
    const alert = req.body;
    createAlert(alert)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getAlert = (req, res) => {
    const id = req.params.id;
    console.log("id --->", id);
    findOne(id)
    .then((data) => {   
        console.log("data", data);
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No alert found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const deleteAlert = (req, res) => {
    const id = req.params.id;
    removeAlert(id)
    .then((data) => {   
        console.log("data.affectedRows", data.affectedRows);
        if (data.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No alert found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const editAlert = (req, res) => {
    const id = req.params.id;

    const alert = req.body;

    modifyAlert(alert, id)
    .then((data) => {
        if (data.affectedRows === 1) {
            res.json({ id, ...alert})
        } else {
            res.status(404).json({ message : "No alert found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllAlerts, getAlert, addAlert, deleteAlert, editAlert };