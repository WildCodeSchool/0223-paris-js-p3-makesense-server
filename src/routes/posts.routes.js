const router = require("express").Router();

const { getAllPosts, getPost, addPost, deletePost, editPost, getVoteFromUser,getVoteFromPost, addVote, countVote, countPositiveAndNegativeVote,countAllVoteFromPost , addUserParticipant, getExpertFromPost, getImpactedFromPost} = require("../controller/postController.js");

const { validatePost } = require("../validator/postValidator.js");
const {authorize, isAdmin} = require("../middlewares/auth.js")

router.get("/",authorize, getAllPosts);
router.post("/",authorize, validatePost, addPost);
router.get("/:id",authorize, getPost);
router.delete("/:id",authorize, deletePost);
router.put("/:id",authorize, editPost);
router.get("/votes/fromuser/:id",authorize, getVoteFromUser);
router.get("/votes/frompost/:id",authorize, getVoteFromPost);
router.post("/votes",authorize, addVote);
router.get("/votes/countvote/:count",authorize, countVote);
router.get("/votes/allvotepost/:id",authorize, countPositiveAndNegativeVote);
router.get("/votes/votepost/:count",authorize, countAllVoteFromPost);
router.post("/participants",authorize, addUserParticipant);
router.get("/expert/:id",authorize, getExpertFromPost);
router.get("/impacted/:id",authorize, getImpactedFromPost);

module.exports = router;