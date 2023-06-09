const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from alert")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .execute("select * from alert where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createAlert = (alert) => {
    const { title , text} = alert;
    return db
        .execute("insert into alert (title, text) values (?, ?)",
        [title, text])
        .then(([data]) => {
            return { id: data.insertId, ...alert };
        })
        .catch((err) =>{
            console.log("err", err)
            return err;
        })
} 

const removeAlert = (id) => {
    return db
        .execute("delete from alert where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const modifyAlert = (alert, id) => {
    return db
        .execute("update alert set ? where id = ?", [alert, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

module.exports = { findAll, findOne, createAlert, removeAlert, modifyAlert };