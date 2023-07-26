const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from job")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const countAll = () => {
    return db
        .query("select COUNT(*) as count from job")
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
        .execute("select * from job where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createJob = (job) => {
    const { name } = job;
    return db
        .execute("insert into job (name) values (?)",
        [name])
        .then(([data]) => {
            return { id: data.insertId, ...job };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removeJob = (id) => {
    return db
        .execute("delete from job where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
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
            return err;
        })
} 

const findOneByJobName = (name) => {
    return db
        .execute("select * from job where name = ?", [name])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

module.exports = { findAll, findOne, createJob, removeJob, modifyJob, findOneByJobName, countAll };