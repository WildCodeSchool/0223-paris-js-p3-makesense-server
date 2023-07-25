const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from role")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const countAll = () => {
    return db
        .query("select COUNT(*) as count from role")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const findOne = (id) => {
    return db
        .execute("select * from role where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createRole = (role) => {
    const { name } = role;
    return db
        .execute("insert into role (name) values (?)",
        [name])
        .then(([data]) => {
            return { id: data.insertId, ...role };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removeRole = (id) => {
    return db
        .execute("delete from role where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const modifyRole = (role, id) => {
    return db
        .query("update role set ? where id = ?", [role, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findOneByRoleName = (name) => {
    return db
        .execute("select * from role where name = ?", [name])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

module.exports = { findAll, findOne, createRole, removeRole, modifyRole, findOneByRoleName, countAll };