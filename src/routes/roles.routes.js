const router = require("express").Router();

const { getAllRoles, getRole, addRole, deleteRole, editRole } = require("../controller/roleController.js");

const { validateRoleName } = require("../validator/roleValidator");
const {authorize, isAdmin} = require("../middlewares/auth.js")


router.get("/",authorize, getAllRoles);
router.post("/",authorize, validateRoleName, addRole);
router.get("/:id",authorize, getRole);
router.delete("/:id",authorize, deleteRole);
router.put("/:id",authorize, editRole);

module.exports = router;