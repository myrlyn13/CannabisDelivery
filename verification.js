document.addEventListener('DOMContentLoaded', () => {
    const ageVerificationModal = document.getElementById('age-verification');
    const medicalCardModal = document.getElementById('medical-card-verification');
    const ageForm = document.getElementById('age-verification-form');
    const medicalCardForm = document.getElementById('medical-card-form');

    // Check if age has been verified
    if (!localStorage.getItem('ageVerified')) {
        ageVerificationModal.style.display = 'block';
    } else if (!localStorage.getItem('medicalCardVerified')) {
        medicalCardModal.style.display = 'block';
    }

    ageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dob = new Date(document.getElementById('dob').value);
        const age = calculateAge(dob);

        if (age >= 21) {
            localStorage.setItem('ageVerified', 'true');
            ageVerificationModal.style.display = 'none';
            medicalCardModal.style.display = 'block';
        } else {
            alert('You must be 21 or older to access this site.');
            window.location.href = 'https://www.google.com';
        }
    });

    medicalCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardImage = document.getElementById('card-image').files[0];

        // Here you would typically send this data to your server for verification
        // For this example, we'll just simulate a successful verification
        verifyMedicalCard(cardNumber, cardExpiry, cardImage)
            .then(() => {
                localStorage.setItem('medicalCardVerified', 'true');
                medicalCardModal.style.display = 'none';
                alert('Medical card verified successfully!');
            })
            .catch((error) => {
                alert('Medical card verification failed: ' + error);
            });
    });
});

function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function verifyMedicalCard(cardNumber, cardExpiry, cardImage) {
    // This function would typically make an API call to your server
    // to verify the medical card details against a database or third-party service
    return new Promise((resolve, reject) => {
        // Simulating an API call with a timeout
        setTimeout(() => {
            if (cardNumber && cardExpiry && cardImage) {
                resolve();
            } else {
                reject('Invalid card information');
            }
        }, 2000);
    });
}
