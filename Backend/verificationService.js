const axios = require('axios');

exports.verifyAge = async (dateOfBirth) => {
  const age = calculateAge(dateOfBirth);
  return age >= 21;
};

exports.verifyMedicalCard = async (cardNumber, expiryDate, imageUrl) => {
  // In a real-world scenario, you would integrate with a third-party verification service
  // or your state's medical marijuana program API to verify the card details.
  // For this example, we'll use a mock API call.

  try {
    const response = await axios.post('https://api.medicalcardverification.com/verify', {
      cardNumber,
      expiryDate,
      imageUrl
    });

    return response.data.isValid;
  } catch (error) {
    console.error('Error verifying medical card:', error);
    return false;
  }
};

function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
