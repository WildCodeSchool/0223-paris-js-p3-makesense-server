const db = require("./db");

const findAll = () => {
    return db
        .query("select * from job")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
}

const findOne = (id) => {
    return db
        .query("select * from job where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const createJob = (job) => {
    const { name } = job;
    console.log("job", job)
    return db
        .query("insert into job (name) values (?)",
        [name])
        .then(([data]) => {
            return { id: data.insertId, ...job };
        })
        .catch((err) =>{
            console.log("err", err)
            return err;
        })
} 

const removeJob = (id) => {
    return db
        .query("delete from job where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 

const modifyJob = (job, id) => {
    return db
        .query("update job set ? where id = ?", [job, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
        })
} 


module.exports = { findAll, findOne, createJob, removeJob, modifyJob };