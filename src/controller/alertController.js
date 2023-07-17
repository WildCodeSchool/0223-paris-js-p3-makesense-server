const { findAll, findOne, createAlert, removeAlert, modifyAlert, findAlertByUserID, createAlertByUser } = require("../model/alertModel"); 

const getAllAlerts = async (req, res) => {
    try {
        const data = await  findAll();

        if (data.length !== 0) {
            res.status(200).json(data)
        } else {
            res.status(404).json({error : "No alerts"});
        }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}


const addAlert = async (req, res) => {
    const alert = req.body;
    try {
        const dataAddAlert = await createAlert(alert);
        const newAlert = {
            alert_id : dataAddAlert.id,
            user_id : alert.user_id
        }

        const addAlertByUserIdConst =  await addAlertByUserId(newAlert);
        if (addAlertByUserIdConst == null) {
            res.json({message : "Error Interne"});
        } else {
            res.status(201).json(dataAddAlert);
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addAlertByUserId = async (newAlert) => {
    try {
        const dataAddAlertByuserId = await createAlertByUser(newAlert);
        return {...newAlert, ...dataAddAlertByuserId}
    } catch (err) {
        console.log("err", err)
        return null
    }
}


const getAlert = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetAlert = await findOne(id);
        res.status(201).json(dataGetAlert)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const deleteAlert = async (req, res) => {
    const id = req.params.id;
    try {
        const dataDeleteAlert = await removeAlert(id);
        if (dataDeleteAlert.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No Alert found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editAlert = async (req, res) => {
    const id = req.params.id;

    const alert = req.body;

    try {
        const dataEditRole = await modifyAlert(alert, id);
        if (dataEditRole.affectedRows === 1) {
            res.json({ id, ...alert})
        } else {
            res.status(404).json({ message : "No Alert found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getAlertByUserID = async  (req, res) => {
    const id = req.params.id;

    try {
        const dataFindAlertByUserID = await findAlertByUserID(id);
        res.status(200).json(dataFindAlertByUserID)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllAlerts, getAlert, addAlert, deleteAlert, editAlert, getAlertByUserID};