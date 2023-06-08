const { findAll, findOne, createPost, removePost, modifyPost } = require("../model/postModel"); 


const getAllPosts = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addPost = (req, res) => {
    const post = req.body;
    const date = new Date();
    createPost({...post, date})
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getPost = (req, res) => {
    const id = req.params.id;
    findOne(id)
    .then((data) => {   
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No post found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const deletePost = (req, res) => {
    const id = req.params.id;
    removePost(id)
    .then((data) => {   
        if (data.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No post found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const editPost = (req, res) => {
    const id = req.params.id;

    const post = req.body;

    modifyPost(post, id)
    .then((data) => {
        if (data.affectedRows === 1) {
            res.json({ id, ...post})
        } else {
            res.status(404).json({ message : "No post found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

module.exports = { getAllPosts, getPost, addPost, deletePost, editPost };