const router = require("express").Router();

const { getAllRoles, getRole, addRole, deleteRole, editRole } = require("../controller/roleController.js");


router.get("/", getAllRoles);
router.post("/", addRole);
router.get("/:id", getRole);
router.delete("/:id", deleteRole);
router.put("/:id", editRole);

module.exports = router;