const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from user_post_avis")
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
        .execute("select * from user_post_avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createAvis = (avis) => {
    const { text, date, user_id, post_id } = avis;
    return db
        .execute("insert into user_post_avis (user_id, post_id, text, date) values (?, ?, ?, ?)",
        [user_id, post_id, text, date])
        .then(([data]) => {
            return { id: data.insertId, ...avis };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removeAvis = (id) => {
    return db
        .execute("delete from user_post_avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const modifyAvis = (avis, id) => {
    return db
        .execute("update user_post_avis set ? where id = ?", [avis, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

module.exports = { findAll, findOne, createAvis, removeAvis, modifyAvis };