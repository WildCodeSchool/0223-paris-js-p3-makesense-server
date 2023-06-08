const db = require("./db");

const findAll = () => {
    return db
        .query("select * from user_post_avis")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .query("select * from user_post_avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createAvis = (avis) => {
    const { text, date, user_id, post_id } = avis;
    return db
        .query("insert into user_post_avis (user_id, post_id, text, date) values (?, ?, ?, ?)",
        [user_id, post_id, text, date])
        .then(([data]) => {
            return { id: data.insertId, ...avis };
        })
        .catch((err) =>{
            return err;
        })
} 

const removeAvis = (id) => {
    return db
        .query("delete from user_post_avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const modifyAvis = (avis, id) => {
    return db
        .query("update user_post_avis set ? where id = ?", [avis, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

module.exports = { findAll, findOne, createAvis, removeAvis, modifyAvis };