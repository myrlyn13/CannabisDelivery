const User = require('../models/User');
const { verifyAge, verifyMedicalCard } = require('../services/verificationService');

exports.verifyAge = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAgeVerified) {
      return res.status(400).json({ message: 'Age already verified' });
    }

    if (user.verificationAttempts >= 3) {
      const cooldownPeriod = 30 * 60 * 1000; // 30 minutes
      if (Date.now() - user.lastVerificationAttempt.getTime() < cooldownPeriod) {
        return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
      }
    }

    const isVerified = await verifyAge(user.dateOfBirth);
    if (isVerified) {
      user.isAgeVerified = true;
      user.verificationAttempts = 0;
    } else {
      user.verificationAttempts += 1;
      user.lastVerificationAttempt = new Date();
    }

    await user.save();

    res.json({ isVerified });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying age', error: error.message });
  }
};

exports.verifyMedicalCard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isMedicalCardVerified) {
      return res.status(400).json({ message: 'Medical card already verified' });
    }

    if (user.verificationAttempts >= 3) {
      const cooldownPeriod = 30 * 60 * 1000; // 30 minutes
      if (Date.now() - user.lastVerificationAttempt.getTime() < cooldownPeriod) {
        return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
      }
    }

    const isVerified = await verifyMedicalCard(user.medicalCardNumber, user.medicalCardExpiry, user.medicalCardImageUrl);
    if (isVerified) {
      user.isMedicalCardVerified = true;
      user.verificationAttempts = 0;
    } else {
      user.verificationAttempts += 1;
      user.lastVerificationAttempt = new Date();
    }

    await user.save();

    res.json({ isVerified });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying medical card', error: error.message });
  }
};
