const router = require("express").Router();

const { getAllAlerts, getAlert, addAlert, deleteAlert, editAlert } = require("../controller/alertController.js");

router.get("/", getAllAlerts);
router.post("/", addAlert);
router.get("/:id", getAlert);
router.delete("/:id", deleteAlert);
router.put("/:id", editAlert);

module.exports = router;