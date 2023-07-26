const router = require("express").Router();

const {
  getAllAvis,
  getAvis,
  addAvis,
  deleteAvis,
  editAvis,
  getAvisFromUser,
  countAvis,
  getAllAvisFromPost,
} = require("../controller/avisController.js");

const { validateAvisPost } = require("../validator/avisValidator.js");
const { authorize, isAdmin } = require("../middlewares/auth.js");

router.get("/", authorize, getAllAvis);
router.post("/", authorize, validateAvisPost, addAvis);
router.get("/:id", authorize, getAvis);
router.get("/frompost/:count", authorize, countAvis);
router.get("/avisfrompost/:id", authorize, getAllAvisFromPost);
router.get("/fromuser/:id", authorize, getAvisFromUser);
router.delete("/:id", authorize, deleteAvis);
router.put("/:id", authorize, editAvis);

module.exports = router;
