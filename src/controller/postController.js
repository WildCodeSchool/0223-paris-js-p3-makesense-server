const { findAll, findOnePost, createPost, removePost, modifyPost } = require("../model/postModel"); 


const getAllPosts = async (req, res) => {
    try {
        const datagetAllPost = await findAll();

        if (datagetAllPost.length !== 0) {
            res.status(200).json(datagetAllPost)
        } else {
            res.status(404).json({error : "No posts"});
        }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addPost = async (req, res) => {
    const post = req.body;
    const createdDate = new Date();

    // console.log("post", post)
    // console.log("createdDate", createdDate)
    try {
        const dataAddUser = await createPost({...post, createdDate});
        res.status(201).json(dataAddUser)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetPost = await findOnePost(id);
        res.status(201).json(dataGetPost)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const dataDeletePost = await removePost(id);
        if (dataDeletePost.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No post found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editPost = async (req, res) => {
    const id = req.params.id;

    const post = req.body;
    if (post?.deadlineDate) {
        const formattedDeadlineDate = new Date(post?.deadlineDate);
        post.deadlineDate = formattedDeadlineDate;
    }

    if (post?.makeDecisionDate) {
        const formattedMakeDecisionDate = new Date(post?.makeDecisionDate);
        post.makeDecisionDate = formattedMakeDecisionDate;
    }

    if (post?.conflitDate) {
        const formattedConflitDate = new Date(post?.conflitDate);
        post.conflitDate = formattedConflitDate;
    }

    try {
        const dataEditPost = await modifyPost(post, id);
        if (dataEditPost.affectedRows === 1) {
            res.json({ id, ...post})
        } else {
            res.status(404).json({ message : "No post found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllPosts, getPost, addPost, deletePost, editPost };