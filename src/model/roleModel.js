const db = require("./db");

const findAll = () => {
    return db
        .query("select * from role")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .query("select * from role where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createRole = (role) => {
    const { name } = role;
    return db
        .query("insert into role (name) values (?)",
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
        .query("delete from role where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
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
        })
} 

module.exports = { findAll, findOne, createRole, removeRole, modifyRole };