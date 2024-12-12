document.addEventListener('DOMContentLoaded', () => {
    const ageVerification = document.getElementById('age-verification');
    const confirmAge = document.getElementById('confirm-age');
    const rejectAge = document.getElementById('reject-age');

    if (!localStorage.getItem('ageVerified')) {
        ageVerification.style.display = 'block';
    }

    confirmAge.addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        ageVerification.style.display = 'none';
    });

    rejectAge.addEventListener('click', () => {
        window.location.href = 'https://www.google.com'; // Redirect to a safe site
    });
});
