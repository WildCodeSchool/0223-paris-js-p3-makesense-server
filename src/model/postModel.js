const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from post")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findOnePost = (id) => {
    return db
        .execute("select * from post where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createPost = (post) => {
    const { title, description, createdDate, status, profit, risk, avatar, user_id, category, location, impact, deadlineDate, makeDecisionDate, conflitDate, vote } = post;
    console.log('post --->', post)

    const formatedDeadlineDate = new Date(deadlineDate);
    const formatedMakeDecisionDate = new Date(makeDecisionDate);
    const formatedConflitDate = new Date (conflitDate);

    return db
        .execute("insert into post (title, description, createdDate, status, profit, risk, avatar, user_id, category, location, impact, deadlineDate, makeDecisionDate, conflitDate, vote) values (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?)",
        [title, description, createdDate, status, profit, risk, avatar, user_id, category, location, impact, formatedDeadlineDate, formatedMakeDecisionDate, formatedConflitDate, vote])
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
            return err;
        })
} 

const modifyPost = (post, id) => {
    console.log("post", post)
    return db
        .query("update post set ? where id = ?", [post, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

module.exports = { findAll, findOnePost, createPost, removePost, modifyPost };