const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from alert")
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
        .execute("select * from alert where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createAlert = (alert) => {
    const { title } = alert;
    return db
        .execute("insert into alert (title) values (?)",
        [title])
        .then(([data]) => {
            return { id: data.insertId, ...alert };
        })
        .catch((err) =>{
            console.error("err", err)
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
            return err;
        })
} 

const modifyAlert = (alert, id) => {
    return db
        .query("update alert set ? where id = ?", [alert, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findAlertByUserID = (id) => {
    return db
        .query("select a.title from alert as a inner join user_alert as u on a.id = u.Alert_id where u.user_id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createAlertByUser  = (alert) => {
    const { alert_id , user_id} = alert;
    return db
        .execute("insert into user_alert (alert_id, user_id) values (?, ?)",
        [alert_id, user_id])
        .then(([data]) => {
            return { id: data.insertId, ...alert };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

module.exports = { findAll, findOne, createAlert, removeAlert, modifyAlert, findAlertByUserID, createAlertByUser};