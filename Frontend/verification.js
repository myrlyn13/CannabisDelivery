document.addEventListener('DOMContentLoaded', () => {
    const ageVerificationModal = document.getElementById('age-verification');
    const medicalCardModal = document.getElementById('medical-card-verification');
    const ageForm = document.getElementById('age-verification-form');
    const medicalCardForm = document.getElementById('medical-card-form');

    // Rate limiting variables
    const maxAttempts = 3;
    const cooldownPeriod = 30 * 60 * 1000; // 30 minutes in milliseconds
    let attempts = JSON.parse(localStorage.getItem('verificationAttempts')) || { age: 0, medical: 0 };
    let lastAttemptTime = JSON.parse(localStorage.getItem('lastAttemptTime')) || { age: 0, medical: 0 };

    function checkRateLimit(type) {
        const now = Date.now();
        if (attempts[type] >= maxAttempts && now - lastAttemptTime[type] < cooldownPeriod) {
            const remainingTime = Math.ceil((cooldownPeriod - (now - lastAttemptTime[type])) / 60000);
            alert(`Too many attempts. Please try again in ${remainingTime} minutes.`);
            return false;
        }
        return true;
    }

    function updateAttempts(type) {
        attempts[type]++;
        lastAttemptTime[type] = Date.now();
        localStorage.setItem('verificationAttempts', JSON.stringify(attempts));
        localStorage.setItem('lastAttemptTime', JSON.stringify(lastAttemptTime));
    }

    function resetAttempts(type) {
        attempts[type] = 0;
        localStorage.setItem('verificationAttempts', JSON.stringify(attempts));
    }

    // Check if age has been verified
    if (!localStorage.getItem('ageVerified')) {
        ageVerificationModal.style.display = 'block';
    } else if (!localStorage.getItem('medicalCardVerified')) {
        medicalCardModal.style.display = 'block';
    }

    ageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!checkRateLimit('age')) return;

        const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert('Please complete the CAPTCHA');
        return;
    }

        const dob = new Date(document.getElementById('dob').value);
        const age = calculateAge(dob);

        if (age >= 21) {
            localStorage.setItem('ageVerified', 'true');
            resetAttempts('age');
            ageVerificationModal.style.display = 'none';
            medicalCardModal.style.display = 'block';
        } else {
            updateAttempts('age');
            alert('You must be 21 or older to access this site.');
            if (attempts.age >= maxAttempts) {
                window.location.href = 'https://www.google.com';
            }
        }
    });

    medicalCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!checkRateLimit('medical')) return;

        const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert('Please complete the CAPTCHA');
        return;
    }

        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardImage = document.getElementById('card-image').files[0];

        verifyMedicalCard(cardNumber, cardExpiry, cardImage)
            .then(() => {
                localStorage.setItem('medicalCardVerified', 'true');
                resetAttempts('medical');
                medicalCardModal.style.display = 'none';
                alert('Medical card verified successfully!');
            })
            .catch((error) => {
                updateAttempts('medical');
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

function setVerificationStatus(type, status) {
    sessionStorage.setItem(`${type}Verified`, status);
    // Also send a request to the server to set an HttpOnly cookie
    fetch('/api/set-verification-cookie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, status }),
    });
}

function getVerificationStatus(type) {
    return sessionStorage.getItem(`${type}Verified`) === 'true';
}

// Use these functions instead of directly accessing localStorage
