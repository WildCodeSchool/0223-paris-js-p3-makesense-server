const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from user")
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
        .execute("select * from user where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createUser = (user) => {
    const { firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin} = user;
    return db
        .execute("insert into user (firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin])
        .then(([data]) => {
            return { id: data.insertId, ...user };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removeUser = (id) => {
    return db
        .execute("delete from user where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const modifyUser = (user, id) => {
    return db
        .query("update user set ? where id = ?", [user, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

module.exports = { findAll, findOne, createUser, removeUser, modifyUser };