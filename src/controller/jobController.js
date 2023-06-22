const { findAll, findOne, createJob, removeJob, modifyJob } = require("../model/jobModel");

const getAllJobs = async (req, res) => {
    try {
    const datagetAllJobs = await findAll();
    if (datagetAllJobs.length !== 0) {
        res.status(200).json(datagetAllJobs)
    } else {
        res.status(404).json({error : "No Jobs"});
    }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addJob = async (req, res) => {
    const job = req.body;
    try {
        const dataAddJob = await createJob(job);
        res.status(201).json(dataAddJob)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getJob = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetJob = await findOne(id);
        res.status(201).json(dataGetJob)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }

}

const deleteJob = async (req, res) => {
    const id = req.params.id;
    try {
        const dataDeleteJob = await removeJob(id);
        if (dataDeleteJob.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No job found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editJob = async (req, res) => {
    const id = req.params.id;
    
    const job = req.body;

    try {
        const dataEditJob = await modifyJob(job, id);
        console.log("dataEditJob", dataEditJob)
        if (dataEditJob.affectedRows === 1) {
            res.json({ id, ...job})
        } else {
            res.status(404).json({ message : "No job found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllJobs, getJob, addJob, deleteJob, editJob };