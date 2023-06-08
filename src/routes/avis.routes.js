const router = require("express").Router();

const { getAllAvis, getAvis, addAvis, deleteAvis, editAvis } = require("../controller/avisController.js");

const { validateAvisPost } = require("../validator/avisValidator");

router.get("/", getAllAvis);
router.post("/", validateAvisPost, addAvis);
router.get("/:id", getAvis);
router.delete("/:id", deleteAvis);
router.put("/:id", editAvis);

module.exports = router;