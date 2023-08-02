const router = require("express").Router();

const { getAllUsers, getUser, deleteUser, editUser, register, login, logout, getCurrentUser, sendResetPassword, resetPassword, getAllCountUsers, editUserAdmin, verifyToken } = require("../controller/userController.js");

const { validateUser } = require("../validator/userValidator.js");
const {authorize, isAdmin} = require("../middlewares/auth.js")
const upload = require("../middlewares/userFileUpload.js");
const { generateRandomPassword } = require("../middlewares/generateRandomPassword.js");

router.get("/count",authorize, isAdmin, getAllCountUsers);
router.get("/",authorize, getAllUsers);
router.get("/me", authorize, getCurrentUser);
router.post("/register", authorize, isAdmin, generateRandomPassword, validateUser, register);
router.post("/login", login);
router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);
router.post("/token", verifyToken);
router.get("/logout",authorize, logout);
router.get("/:id",authorize, isAdmin, getUser);
router.delete("/:id",authorize, isAdmin, deleteUser);
router.put("/admin/:id", authorize, isAdmin, upload.single("avatar"), validateUser, editUserAdmin);
router.put("/", authorize, upload.single("avatar"), validateUser, editUser);

module.exports = router;