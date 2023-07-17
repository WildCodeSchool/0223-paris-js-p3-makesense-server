const router = require("express").Router();

const { getAllUsers, getUser, addUser, deleteUser, editUser, register, login, logout, getCurrentUser } = require("../controller/userController.js");

const { validateUserPost } = require("../validator/userValidator");
const {authorize, isAdmin} = require("../middlewares/auth.js")

router.get("/",authorize, getAllUsers);
router.get("/me", authorize, getCurrentUser);
router.post("/",authorize, isAdmin, validateUserPost, addUser);
router.post("/register", authorize, isAdmin, register);
router.post("/login", login);
router.get("/logout",authorize, logout);
router.get("/:id",authorize, getUser);
router.delete("/:id",authorize, isAdmin, deleteUser);
router.put("/", authorize, editUser);

module.exports = router;