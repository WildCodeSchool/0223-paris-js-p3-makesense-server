const router = require("express").Router();

const { getAllRoles, getRole, addRole, deleteRole, editRole } = require("../controller/roleController.js");

const { validateRoleName } = require("../validator/roleValidator.js");
const {authorize, isAdmin} = require("../middlewares/auth.js")


router.get("/",authorize, getAllRoles);
router.post("/",authorize, validateRoleName, isAdmin, addRole);
router.get("/:id",authorize, getRole);
router.delete("/:id",authorize, isAdmin, deleteRole);
router.put("/:id",authorize, isAdmin, editRole);

module.exports = router;