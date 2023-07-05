const router = require("express").Router();

const { getAllJobs, getJob, addJob, deleteJob, editJob } = require("../controller/jobController.js");
const {authorize, isAdmin} = require("../middlewares/auth.js")

router.get("/",authorize, getAllJobs);
router.post("/",authorize,  addJob);
router.get("/:id",authorize, getJob);
router.delete("/:id",authorize, deleteJob);
router.put("/:id",authorize, editJob);

module.exports = router;