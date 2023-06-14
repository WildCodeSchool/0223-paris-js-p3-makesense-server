const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from tag")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Erreur", err)
        })
} 

const findOne = (id) => {
    return db
        .execute("select * from tag where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Erreur", err)
        })
} 

const createTag = (tag) => {
    const { name } = tag;
    return db
        .execute("insert into tag (name) values (?)",
        [name])
        .then(([data]) => {
            return { id: data.insertId, ...tag };
        })
        .catch((err) =>{
            console.error("Erreur", err)
            return err;
        })
} 
 

module.exports = { findAll, findOne, createTag };