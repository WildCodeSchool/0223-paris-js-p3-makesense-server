const { findAll, findOne, createAvis, removeAvis, modifyAvis } = require("../model/avisModel"); 

const {  findAlertByUserID, createAlertByUser, createAlert } = require("../model/alertModel"); 

const { findOnePost } = require("../model/postModel");

const getAllAvis = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addAvis = (req, res) => {
    const avis = req.body;
    const date = new Date();
    createAvis({...avis, date})
    .then((dataAvis) => {
        findOnePost(avis.post_id)
        .then(([dataPost]) => {
            createAlert(dataPost)
            .then((dataAlert) => {
                const newAlert = {
                    alert_id : dataAlert.id,
                    user_id : avis.user_id
                }
                createAlertByUser(newAlert)
                .then((dataNewAlert) =>{
                    res.json({avis})
                })
                .catch((err) => {
                    res.status(500).json({ message :  "Server error 1", err})
                })
            })
            .catch((err) => {
                res.status(500).json({ message :  "Server error 1", err})
            })
        })
        .catch((err) => {
            res.status(500).json({ message :  "Server error 1", err})
        })
    })
    .catch((err) => {
        res.status(500).json({ message :  "Server error 1", err})
    })
}

const getAvis = (req, res) => {
    const id = req.params.id;
    findOne(id)
    .then((data) => {   
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No avis found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const deleteAvis = (req, res) => {
    const id = req.params.id;
    removeAvis(id)
    .then((data) => {   
        if (data.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No avis found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const editAvis = (req, res) => {
    const id = req.params.id;

    const avis = req.body;

    modifyAvis(avis, id)
    .then((data) => {
        if (data.affectedRows === 1) {
            res.json({ id, ...avis})
        } else {
            res.status(404).json({ message : "No avis found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllAvis, getAvis, addAvis, deleteAvis, editAvis };