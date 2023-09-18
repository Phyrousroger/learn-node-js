const express = require("express");
const {
  registermethod,
  loginmethod,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateErrorHandler");
const router = express.Router();

router.post("/register", registermethod);

router.post("/login", loginmethod);
router.get("/current", validateToken, currentUser);

module.exports = router;
