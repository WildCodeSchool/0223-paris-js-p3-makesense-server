const router = require("express").Router();

const { getAllAlerts, getAlert, addAlert, deleteAlert, editAlert, getAlertByUserID } = require("../controller/alertController.js");

const { validateAlert } = require("../validator/alertValidator");


router.get("/", getAllAlerts);
router.post("/", validateAlert, addAlert);
router.get("/:id", getAlert);
router.delete("/:id", deleteAlert);
router.put("/:id", editAlert);
router.get("/user/:id", getAlertByUserID);

module.exports = router;