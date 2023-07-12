const router = require("express").Router();

const { getAllUsers, getUser, deleteUser, editUser, register, login, logout, getCurrentUser, sendResetPassword, resetPassword } = require("../controller/userController.js");

const { validateUserPost } = require("../validator/userValidator");
const {authorize, isAdmin} = require("../middlewares/auth.js")
const upload = require("../middlewares/userFileUpload.js");

router.get("/",authorize, getAllUsers);
router.get("/me", authorize, getCurrentUser);
router.post("/register", authorize, isAdmin, validateUserPost, register);
router.post("/login", login);
router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);
router.get("/logout",authorize, logout);
router.get("/:id",authorize, getUser);
router.delete("/:id",authorize, isAdmin, deleteUser);
router.put("/:id",authorize, upload.single("avatar"), editUser);

module.exports = router;