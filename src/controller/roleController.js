const { findAll, findOne, createRole, removeRole, modifyRole, findOneByRoleName, countAll } = require("../model/roleModel"); 

const { findAllUserByRoleId } = require("../model/userModel");

const getAllRoles = async (req, res) => {
    try {
        const datagetAllRoles = await findAll();

        if (datagetAllRoles.length !== 0) {
            res.status(200).json(datagetAllRoles)
        } else {
            res.status(404).json({error : "No roles"});
        }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getAllCountRoles = async (req, res) => {
    try {
    const [datagetAllRoles] = await countAll();
    if (datagetAllRoles.length !== 0) {
        res.status(200).json(datagetAllRoles)
    } else {
        res.status(404).json({error : "No Roles"});
    }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}


const addRole = async (req, res) => {
    const role = req.body;
    try {
        const dataCheckRoleName = await findOneByRoleName(role.name);
        if (dataCheckRoleName != 0) {
            res.status(403).json({error : "Duplicate name role"})
        } else {
            const dataAddRole = await createRole(role);
            res.status(201).json(dataAddRole)
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getRole = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetRole = await findOne(id);
        res.status(201).json(dataGetRole)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const searchAllUserByRoleid = await findAllUserByRoleId(id);
        if (searchAllUserByRoleid.length != 0) return res.status(401).json({ message : "error there are still users who have this role"});
        const dataDeleteRole = await removeRole(id);
        if (dataDeleteRole.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error : "No role found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editRole = async (req, res) => {
    const id = req.params.id;
    
    const role = req.body;
    
    try {
        const dataEditRole = await modifyRole(role, id);
        if (dataEditRole.affectedRows === 1) {
            res.json({ id, ...role})
        } else {
            res.status(404).json({ message : "No role found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllRoles, getRole, addRole, deleteRole, editRole, getAllCountRoles};