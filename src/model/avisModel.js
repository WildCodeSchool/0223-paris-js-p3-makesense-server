const db = require("./db");

const findAll = () => {
    return db
        .query("select * from avis")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .query("select * from avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createAvis = (avis) => {
    const { text, date } = avis;
    return db
        .query("insert into avis (text, date ) values (?, ?)",
        [text, date ])
        .then(([data]) => {
            return { id: data.insertId, ...avis };
        })
        .catch((err) =>{
            return err;
        })
} 

const removeAvis = (id) => {
    return db
        .query("delete from avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const modifyAvis = (avis, id) => {
    return db
        .query("update avis set ? where id = ?", [avis, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

module.exports = { findAll, findOne, createAvis, removeAvis, modifyAvis };