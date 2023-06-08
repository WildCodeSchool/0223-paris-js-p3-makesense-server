const { findAll, findOne, createAvis, removeAvis, modifyAvis } = require("../model/avisModel"); 


const getAllAvis = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addAvis = (req, res) => {
    const avis = req.body;
    const date = new Date();
    console.log("date", date);
    createAvis({...avis, date})
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getAvis = (req, res) => {
    const id = req.params.id;
    console.log("id --->", id);
    findOne(id)
    .then((data) => {   
        console.log("data", data);
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
        console.log("data.affectedRows", data.affectedRows);
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