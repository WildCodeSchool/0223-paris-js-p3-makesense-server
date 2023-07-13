const router = require("express").Router();

const { getAllAlerts, getAlert, addAlert, deleteAlert, editAlert, getAlertByUserID } = require("../controller/alertController.js");

const { validateAlert } = require("../validator/alertValidator.js");
const {authorize} = require("../middlewares/auth.js");

router.get("/", authorize, getAllAlerts);
router.post("/", authorize, validateAlert, addAlert);
router.get("/:id", authorize, getAlert);
router.delete("/:id", authorize, deleteAlert);
router.put("/:id", authorize, editAlert);
router.get("/user/:id", authorize, getAlertByUserID);

module.exports = router;