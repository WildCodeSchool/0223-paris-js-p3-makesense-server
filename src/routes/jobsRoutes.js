const router = require("express").Router();

const { getAllJobs, getJob, addJob, deleteJob, editJob, getAllCountJobs } = require("../controller/jobController.js");
const {authorize, isAdmin} = require("../middlewares/auth.js");
const { validateJob } = require("../validator/jobValidator.js");

router.get("/count",authorize, isAdmin, getAllCountJobs);
router.get("/",authorize, getAllJobs);
router.post("/",authorize, isAdmin, validateJob, addJob);
router.get("/:id",authorize, getJob);
router.delete("/:id",authorize, isAdmin, deleteJob);
router.put("/:id",authorize, isAdmin, validateJob, editJob);

module.exports = router;