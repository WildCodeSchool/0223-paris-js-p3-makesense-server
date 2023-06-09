const db = require("../config/db");

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
        .execute("select * from post where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createPost = (post) => {
    const { titre, description, date, status, profit, risk, avatar, user_id } = post;
    return db
        .execute("insert into post (titre, description, date, status, profit, risk, avatar, user_id) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [titre, description, date, status, profit, risk, avatar, user_id])
        .then(([data]) => {
            return { id: data.insertId, ...post };
        })
        .catch((err) =>{
            console.error("error", err)
            return err;
        })
} 

const removePost = (id) => {
    return db
        .execute("delete from post where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const modifyPost = (post, id) => {
    return db
        .execute("update post set ? where id = ?", [post, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

module.exports = { findAll, findOne, createPost, removePost, modifyPost };