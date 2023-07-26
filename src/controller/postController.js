const { findAll, findOnePost, createPost, removePost, modifyPost, createVote, findVoteFromPost, findVoteFromUser, findCountVote, findCountAllVoteFromPost,findCountPositiveAndNegativeVote, findExpertFromPost,findImpactedFromPost, createUserParticipant, findPostFromUser} = require("../model/postModel"); 


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
    console.log(req.body);

    try {
        const filePath = `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`;
        if (post.avatar) {
            if (!req.file) return res.status(400).json("a error occured during the upload");
            filePath = req.protocol + "://" + req.get("host") + "/upload/post/" + req.file.filename;
        }
        const dataAddUser = await createPost({...post, createdDate, avatar : filePath, status : "En cours", user_id: req.idUser});
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

const getPostFromUser = async (req, res) => {
    const id = req.idUser;
    try {
        const dataGetPostFromUser = await findPostFromUser(id);
        res.status(200).json(dataGetPostFromUser)
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

    let post = req.body;
    
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

        if (req.file) {
            const uploadedFilePath = await req.protocol + "://" + req.get("host") + "/upload/post/" + req.file.filename;
            post.avatar = await uploadedFilePath;
        }

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

const getVoteFromUser = async (req, res) => {
    const id = req.idUser;
    try {
        const dataFindVoteFromUser = await findVoteFromUser(id);
        res.status(201).json(dataFindVoteFromUser)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getVoteFromPost = async (req, res) => {
    const id = req.params.id;
    try {
        const dataFindVoteFromPost = await findVoteFromPost(id);
        res.status(201).json(dataFindVoteFromPost)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addVote = async (req, res) => {
    const vote = req.body;

    try {
        const dataAddVote = await createVote(vote);
        res.status(201).json(dataAddVote);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const countVote = async (req, res) => {
    const countVote = req.params.count;

    try {
        const dataCountVote = await findCountVote(countVote);
        res.status(201).json(dataCountVote);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const countPositiveAndNegativeVote = async (req, res) => {
    const countPositiveAndNegativeVote = req.params.id;

    try {
        const dataCountPositiveAndNegativeVote = await findCountPositiveAndNegativeVote(countPositiveAndNegativeVote);
        res.status(201).json(dataCountPositiveAndNegativeVote);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const countAllVoteFromPost = async (req, res) => {
    const CountAllVoteFromPost = req.params.count;

    try {
        const dataCountAllVoteFromPost = await findCountAllVoteFromPost(CountAllVoteFromPost);
        res.status(201).json(dataCountAllVoteFromPost);
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addUserParticipant = async (req, res) => {
    const participant = req.body; 
    console.log("participant", participant)
    if (!participant?.users) {
        return res.status(500).json("Error tab user, user participants")
    }

    const tab = participant.users;
    try {
        for (let i = 0; i < tab.length; i++) {
            await createUserParticipant(tab[i]);
        }
        res.status(201).json("OK add users");
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getExpertFromPost = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetExpertFromPost = await findExpertFromPost(id);
        res.status(201).json(dataGetExpertFromPost)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getImpactedFromPost = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetImpactedFromPost = await findImpactedFromPost(id);
        res.status(201).json(dataGetImpactedFromPost)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllPosts, getPost, addPost, getPostFromUser, deletePost, editPost, getVoteFromUser, getVoteFromPost, addVote, countVote, countAllVoteFromPost, countPositiveAndNegativeVote, addUserParticipant, getExpertFromPost, getImpactedFromPost};
