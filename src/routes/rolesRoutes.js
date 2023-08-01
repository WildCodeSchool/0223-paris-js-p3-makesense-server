const router = require("express").Router();

const { getAllRoles, getRole, addRole, deleteRole, editRole, getAllCountRoles } = require("../controller/roleController.js");

const { validateRoleName } = require("../validator/roleValidator.js");
const {authorize, isAdmin} = require("../middlewares/auth.js")

router.get("/count",authorize, isAdmin, getAllCountRoles);
router.get("/",authorize, getAllRoles);
router.post("/",authorize, validateRoleName, isAdmin, addRole);
router.get("/:id",authorize, getRole);
router.delete("/:id",authorize, isAdmin, deleteRole);
router.put("/:id",authorize, isAdmin, validateRoleName, editRole);

module.exports = router;