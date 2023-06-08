const db = require("./db");

const findAll = () => {
    return db
        .query("select * from tag")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .query("select * from tag where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createTag = (tag) => {
    const { name } = tag;
    console.log("tag", tag)
    return db
        .query("insert into tag (name) values (?)",
        [name])
        .then(([data]) => {
            return { id: data.insertId, ...tag };
        })
        .catch((err) =>{
            console.log("err", err)
            return err;
        })
} 
 

module.exports = { findAll, findOne, createTag };