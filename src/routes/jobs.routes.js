const router = require("express").Router();

const { getAllJobs, getJob, addJob, deleteJob, editJob } = require("../controller/jobController.js");

router.get("/", getAllJobs);
router.post("/",  addJob);
router.get("/:id", getJob);
router.delete("/:id", deleteJob);
router.put("/:id", editJob);

module.exports = router;