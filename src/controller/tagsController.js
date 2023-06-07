const { findAll, findOne, createTag } = require("../model/tagsModel"); 


const getAllTag = (req, res) => {
    findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const addTag = (req, res) => {
    const tag = req.body;
    createTag(tag)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}

const getTag = (req, res) => {
    const id = req.params.id;
    console.log("id --->", id);
    findOne(id)
    .then((data) => {   
        console.log("data", data);
        if (data.length != 0) {
            res.json(data)
        } else {
            res.status(404).json({ message : "No Tag found"})
        }
    })
    .catch((err) => res.status(500).json({ message :  "Server error"}))
}


module.exports = { getAllTag, getTag, addTag };