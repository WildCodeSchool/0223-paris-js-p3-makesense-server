const { findAll, findOne, createJob, removeJob, modifyJob } = require("../model/jobModel");

const getAllJobs = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addJob = (req, res) => {
    const job = req.body;
    createJob(job)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getJob = (req, res) => {
    const id = req.params.id;
    console.log("id --->", id);
    findOne(id)
    .then((data) => {   
        console.log("data", data);
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No job found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const deleteJob = (req, res) => {
    const id = req.params.id;
    removeJob(id)
    .then((data) => {   
        console.log("data.affectedRows", data.affectedRows);
        if (data.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No job found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const editJob = (req, res) => {
    const id = req.params.id;

    const job = req.body;

    modifyJob(job, id)
    .then((data) => {
        if (data.affectedRows === 1) {
            res.json({ id, ...job})
        } else {
            res.status(404).json({ message : "No job found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllJobs, getJob, addJob, deleteJob, editJob };