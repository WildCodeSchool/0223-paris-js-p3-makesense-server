const router = require("express").Router();

const { getAllPosts, getPost, addPost, resetVote, deletePost, editPost, getVoteFromUser, getVoteFromPost, addVote, countVote, countPositiveAndNegativeVote, countAllVoteFromPost, addUserParticipant, getExpertFromPost, getImpactedFromPost, getUserVoteFromPostId, getPostFromUser, getAllCountPosts} = require("../controller/postController.js");
const { validatePost } = require("../validator/postValidator.js");
const {authorize, isAdmin} = require("../middlewares/auth.js")
const upload = require("../middlewares/postFileUpload.js");

router.get("/count",authorize, isAdmin, getAllCountPosts);
router.get("/",authorize, getAllPosts);
router.post("/", authorize, upload.single("avatar"), validatePost, addPost);
router.get("/me", authorize, getPostFromUser);
router.get("/:id",authorize, getPost);
router.delete("/:id",authorize, isAdmin, deletePost);
router.put("/:id",authorize, upload.single("avatar"), editPost);
router.get("/votes/fromuser",authorize, getVoteFromUser);
router.get("/votes/frompost/:id",authorize, getVoteFromPost);
router.get("/votes/fromvote/fromuser/:id/:post_id",authorize, getUserVoteFromPostId);
router.post("/votes",authorize, addVote);
router.delete("/votes/:id",authorize, resetVote);
router.get("/votes/countvote/:count",authorize, countVote);
router.get("/votes/allvotepost/:id",authorize, countPositiveAndNegativeVote);
router.get("/votes/votepost/:count",authorize, countAllVoteFromPost);
router.post("/participants",authorize, addUserParticipant);
router.get("/expert/:id",authorize, getExpertFromPost);
router.get("/impacted/:id",authorize, getImpactedFromPost);

module.exports = router;