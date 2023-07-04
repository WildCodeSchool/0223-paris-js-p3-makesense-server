const router = require("express").Router();

const { getAllUsers, getUser, addUser, deleteUser, editUser } = require("../controller/userController.js");

const { validateUserPost } = require("../validator/userValidator");

router.get("/", getAllUsers);
router.post("/", validateUserPost, addUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);

module.exports = router;