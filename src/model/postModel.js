const db = require("./db");

const findAll = () => {
    return db
        .query("select * from post")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .query("select * from post where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createPost = (post) => {
    const { titre, description, date, status, profit, risk, avatar } = post;
    console.log("post", post)
    return db
        .query("insert into post (titre, description, date, status, profit, risk, avatar) values (?, ?, ?, ?, ?, ?, ?)",
        [titre, description, date, status, profit, risk, avatar])
        .then(([data]) => {
            return { id: data.insertId, ...post };
        })
        .catch((err) =>{
            console.log("err", err)
            return err;
        })
} 

const removePost = (id) => {
    return db
        .query("delete from post where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const modifyPost = (post, id) => {
    return db
        .query("update post set ? where id = ?", [post, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

module.exports = { findAll, findOne, createPost, removePost, modifyPost };