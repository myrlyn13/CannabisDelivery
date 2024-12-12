function checkLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Here you would make an API call to your backend to check if this location is in a legal area
            // For demonstration, we'll just log the coordinates
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        });
    } else {
        console.log("Geolocation is not available");
    }
}

document.addEventListener('DOMContentLoaded', checkLocation);
