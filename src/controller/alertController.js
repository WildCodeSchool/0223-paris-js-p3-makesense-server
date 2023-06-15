const { findAll, findOne, createAlert, removeAlert, modifyAlert, findAlertByUserID, createAlertByUser } = require("../model/alertModel"); 

const getAllAlerts = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addAlert = (req, res) => {
    const alert = req.body;
    createAlert(alert)
    .then((data) => {
        const newAlert = {
            alert_id : id,
            user_id : alert.user_id
        }
        addAlertByUserId(newAlert);
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addAlertByUserId = (newAlert) => {
    createAlertByUser(newAlert)
    .then((data) =>{
        res.json({...alert, ...newAlert})
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}


const getAlert = (req, res) => {
    const id = req.params.id;
    findOne(id)
    .then((data) => {   
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

const getAlertByUserID = (req, res) => {
    const id = req.params.id;

    findAlertByUserID(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllAlerts, getAlert, addAlert, deleteAlert, editAlert, getAlertByUserID};