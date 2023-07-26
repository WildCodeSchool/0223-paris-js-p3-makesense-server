const { findAll, findOne, createJob, removeJob, modifyJob, findOneByJobName, countAll } = require("../model/jobModel");

const { findAllUserByJobId } = require("../model/userModel");

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

const getAllCountJobs = async (req, res) => {
    try {
    const [datagetAllJobs] = await countAll();
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
        const dataCheckJobName = await findOneByJobName(job.name);
        if (dataCheckJobName != 0) {
            res.status(403).json({error : "Duplicate name job"})
        } else {
            const dataAddJob = await createJob(job);
            res.status(201).json(dataAddJob)
        }
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
    try {
        const id = req.params.id;
        const searchAllUserByJobid = await findAllUserByJobId(id);
        if (searchAllUserByJobid.length != 0) return res.status(401).json({ message : "error there are still users who have this job"});
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

module.exports = { getAllJobs, getJob, addJob, deleteJob, editJob, getAllCountJobs};