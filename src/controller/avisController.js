const { findAll, findOne, createAvis, removeAvis, modifyAvis, findAvisFromUser, findCountAvisFromPost } = require("../model/avisModel"); 

const {  findAlertByUserID, createAlertByUser, createAlert } = require("../model/alertModel"); 

const { findOnePost } = require("../model/postModel");

const getAllAvis = async (req, res) => {
    try {
        const datagetAllAvis = await findAll();
        if (datagetAllAvis.length !== 0) {
            res.status(200).json(datagetAllAvis)
        } else {
            res.status(404).json({error : "No avis"});
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addAvis = async (req, res) => {
    const avis = req.body;
    const date = new Date();
    try {
        await createAvis({...avis, date});
        const [getPost] = await findOnePost(avis.post_id)
        if (getPost.length === 0) {
            res.status(404).json({error : "No Post"});
        } else {
            console.log("avis", avis)
            const addAlert = await createAlert(getPost);
            const newAlert = {
                alert_id : addAlert.id,
                user_id : avis.user_id
            }
            const addAlertByUser = await createAlertByUser(newAlert);
            res.status(200).json({addAlertByUser})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getAvis = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetAvis = await findOne(id);
        res.status(201).json(dataGetAvis)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const deleteAvis = async (req, res) => {
    const id = req.params.id;
    try {
        const dataDeleteAvis = await removeAvis(id);
        if (dataDeleteAvis.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No avis found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editAvis = async (req, res) => {
    const id = req.params.id;

    const avis = req.body;

    try {
        const dataEditAvis = await modifyRole(avis, id);
        if (dataEditAvis.affectedRows === 1) {
            res.json({ id, ...avis})
        } else {
            res.status(404).json({ message : "No avis found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const countAvis = async (req, res) => {
    const countAvis = req.params.count;

    try {
        const dataCountAvis = await findCountAvisFromPost(countAvis);
        res.status(201).json(dataCountAvis);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getAvisFromUser = async (req, res) => {
    const id = req.params.id;
    try {
        const dataFindAvisFromUser = await findAvisFromUser(id);
        res.status(201).json(dataFindAvisFromUser)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllAvis, getAvis, addAvis, deleteAvis, editAvis, getAvisFromUser, countAvis };