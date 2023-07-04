const router = require("express").Router();

const { getAllPosts, getPost, addPost, deletePost, editPost, getVoteFromUser,getVoteFromPost, addVote, countVote, countPositiveAndNegativeVote,countAllVoteFromPost , addUserParticipant, getExpertFromPost, getImpactedFromPost} = require("../controller/postController.js");

const { validatePost } = require("../validator/postValidator.js");

router.get("/", getAllPosts);
router.post("/", validatePost, addPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.put("/:id", editPost);
router.get("/votes/fromuser/:id", getVoteFromUser);
router.get("/votes/frompost/:id", getVoteFromPost);
router.post("/votes", addVote);
router.get("/votes/countvote/:count", countVote);
router.get("/votes/allvotepost/:id", countPositiveAndNegativeVote);
router.get("/votes/votepost/:count", countAllVoteFromPost);
router.post("/participants", addUserParticipant);
router.get("/expert/:id", getExpertFromPost);
router.get("/impacted/:id", getImpactedFromPost);

module.exports = router;