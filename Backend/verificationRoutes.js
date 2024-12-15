const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const upload = require('../middleware/upload');

const verificationLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: 'Too many verification attempts, please try again later.'
});

router.post('/verify-age', auth, verificationLimiter, verificationController.verifyAge);
router.post('/verify-medical-card', auth, verificationLimiter, verificationController.verifyMedicalCard);
router.post('/verify-medical-card', auth, verificationLimiter, upload.single('medicalCardImage'), verificationController.verifyMedicalCard);

module.exports = router;
