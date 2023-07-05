const router = require("express").Router();

const { getAllUsers, getUser, addUser, deleteUser, editUser, register, login } = require("../controller/userController.js");

const { validateUserPost } = require("../validator/userValidator");

router.get("/", getAllUsers);
router.post("/", validateUserPost, addUser);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);

module.exports = router;