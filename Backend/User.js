const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  medicalCardNumber: { type: String, required: true },
  medicalCardExpiry: { type: Date, required: true },
  medicalCardImageUrl: { type: String, required: true },
  isAgeVerified: { type: Boolean, default: false },
  isMedicalCardVerified: { type: Boolean, default: false },
  verificationAttempts: { type: Number, default: 0 },
  lastVerificationAttempt: { type: Date },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
