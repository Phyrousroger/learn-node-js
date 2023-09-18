const express = require("express");
const {
  getMethod,
  createMethod,
  updateMethod,
  deleteMethod,
  getdetailmethod,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateErrorHandler");
const router = express.Router();


router.use(validateToken)
router.route("/").get(getMethod);
router.route("/").post(createMethod);
router
  .route("/:id")
  .get(getdetailmethod)
  .put(updateMethod)
  .delete(deleteMethod);
module.exports = router;
