const db = require("../config/db");

const findAll = () => {
    return db
        .query("select user.*, job.name as job, role.name as role from user join job on user.job_id = job.id join role on user.role_id = role.id")
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
        .query("select COUNT(*) as count from user")
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

const getByEmail = async (email) => {
    const [data] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    return data;
}

const updateOneByMail = async (user, email) => {
    return db.query("UPDATE user SET ? WHERE email = ?", [user, email])
}


const createUserAdmin = (user) => {
    const { firstname, lastname, email, password, avatar, job_id, role_id, admin} = user;
    return db
        .execute("insert into user (firstname, lastname, email, password, job_id, role_id, admin, avatar) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [firstname, lastname, email, password, job_id, role_id, admin, avatar])
        .then(([data]) => {
            return { id: data.insertId, ...user };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const findAllUserByJobId = (id) => {
    return db
        .execute("select * from user where job_id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findAllUserByRoleId = (id) => {
    return db
        .execute("select * from user where role_id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 


module.exports = { findAll, findOne, createUser, removeUser, modifyUser,getByEmail, createUserAdmin, updateOneByMail, findAllUserByJobId, findAllUserByRoleId, countAll };