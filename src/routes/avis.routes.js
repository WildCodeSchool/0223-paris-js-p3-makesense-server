const router = require("express").Router();

const { getAllAvis, getAvis, addAvis, deleteAvis, editAvis, getAvisFromUser, countAvis, getAllAvisFromPost  } = require("../controller/avisController.js");

const { validateAvisPost } = require("../validator/avisValidator");

router.get("/", getAllAvis);
router.post("/", validateAvisPost, addAvis);
router.get("/:id", getAvis);
router.get("/frompost/:count", countAvis);
router.get("/avisfrompost/:id", getAllAvisFromPost);
router.get("/fromuser/:id", getAvisFromUser);
router.delete("/:id", deleteAvis);
router.put("/:id", editAvis);

module.exports = router;