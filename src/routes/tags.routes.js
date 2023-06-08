const router = require("express").Router();

const { getAllTag, getTag, addTag, deleteTag, editTag } = require("../controller/tagsController.js");

const { validateTag } = require("../validator/tagsValidator.js");

router.get("/", getAllTag);
router.post("/", validateTag, addTag);
router.get("/:id", getTag);

module.exports = router;