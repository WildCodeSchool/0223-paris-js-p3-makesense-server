const db = require("./db");

const findAll = () => {
    return db
        .query("select * from user")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const findOne = (id) => {
    return db
        .query("select * from user where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createUser = (user) => {
    const { firstname, lastname, email, password, avatar, affiliated_site, tel } = user;
    console.log("user", user)
    return db
        .query("insert into user (firstname, lastname, email, password, avatar, affiliated_site, tel) values (?, ?, ?, ?, ?, ?, ?)",
        [firstname, lastname, email, password, avatar, affiliated_site, tel])
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
        .query("delete from user where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
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
        })
} 

module.exports = { findAll, findOne, createUser, removeUser, modifyUser };