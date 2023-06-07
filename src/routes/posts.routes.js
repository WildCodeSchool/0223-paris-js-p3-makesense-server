const router = require("express").Router();

const { getAllPosts, getPost, addPost, deletePost, editPost } = require("../controller/postController.js");

const { validatePost } = require("../validator/postValidator.js");

router.get("/", getAllPosts);
router.post("/", validatePost, addPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.put("/:id", editPost);

module.exports = router;