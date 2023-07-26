const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from user_post_avis")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findOneAvis = (id) => {
    return db
        .execute("select * from user_post_avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createAvis = (avis) => {
    const { text, date, user_id, post_id } = avis;
    return db
        .execute("insert into user_post_avis (user_id, post_id, text, date) values (?, ?, ?, ?)",
        [user_id, post_id, text, date])
        .then(([data]) => {
            return { id: data.insertId, ...avis };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removeAvis = (id) => {
    return db
        .execute("delete from user_post_avis where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const modifyAvis = (avis, id) => {
    return db
        .query("update user_post_avis set ? where id = ?", [avis, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findAvisFromUser = (id) => {
    return db
    .execute("select p.title, upa.text from post as p inner join user_post_avis as upa on p.id = upa.post_id where upa.user_id = ?", [id])
    .then(([data]) => {
        return data;
    })
    .catch((err) =>{
        console.error("Error ", err)
        return err;
    })
}

const findCountAvisFromPost = (avis) => {
    return db
    .execute("select post_id, count(text) from user_post_avis where post_id = ?  group by post_id;", [avis])
    .then(([data]) => {
        return data;
    })
    .catch((err) =>{
        console.error("Error ", err)
        return err;
    })
}

const findAllAvisFromPost = (id) => {
    return db
    .execute("SELECT user_post_avis.*, user.lastname, user.firstname, user.avatar AS photo FROM user_post_avis JOIN user ON user_post_avis.user_id = user.id WHERE user_post_avis.post_id = ?", [id])
    .then(([data]) => {
        return data;
    })
    .catch((err) =>{
        console.error("Error ", err)
        return err;
    })
}


module.exports = { findAll, findOneAvis, createAvis, removeAvis, modifyAvis, findAvisFromUser, findCountAvisFromPost, findAllAvisFromPost };