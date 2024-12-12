// Updated sample product data with more details
const products = [
    {
        id: 1,
        name: "CBD Oil",
        price: 49.99,
        description: "High-quality CBD oil for pain relief",
        strain: "Hemp-derived",
        potency: "1000mg CBD per 30ml bottle",
        labResults: {
            CBD: "33.3mg/ml",
            THC: "<0.3%",
            terpenes: ["Myrcene", "Limonene", "Caryophyllene"]
        }
    },
    {
        id: 2,
        name: "THC Gummies",
        price: 29.99,
        description: "Delicious THC-infused gummies for relaxation",
        strain: "Hybrid",
        potency: "10mg THC per gummy",
        labResults: {
            THC: "10mg per gummy",
            CBD: "<1mg per gummy",
            terpenes: ["Limonene", "Linalool"]
        }
    },
    // Add more products as needed
];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
        <p class="warning">Warning: This product contains THC. Do not operate a vehicle or machinery under the influence of this product. Keep out of reach of children.</p>
        ';
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p class="warning">For medical use only. Keep out of reach of children.</p>
            <button onclick="showProductDetails(${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalName = document.getElementById('modal-product-name');
    const modalDescription = document.getElementById('modal-product-description');
    const modalPrice = document.getElementById('modal-product-price');
    const modalStrain = document.getElementById('modal-product-strain');
    const modalPotency = document.getElementById('modal-product-potency');
    const modalLabResults = document.getElementById('modal-product-lab-results');

    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `Price: $${product.price.toFixed(2)}`;
    modalStrain.textContent = `Strain: ${product.strain}`;
    modalPotency.textContent = `Potency: ${product.potency}`;

    modalLabResults.innerHTML = '<h4>Lab Results:</h4>';
    for (const [key, value] of Object.entries(product.labResults)) {
        if (Array.isArray(value)) {
            modalLabResults.innerHTML += `<p>${key}: ${value.join(', ')}</p>`;
        } else {
            modalLabResults.innerHTML += `<p>${key}: ${value}</p>`;
        }
    }

    modal.style.display = 'block';
}

function checkLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Here you would make an API call to your backend to check if this location is in a legal area
            // For demonstration, we'll just log the coordinates
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            // If not in a legal area, you might want to redirect or show a warning
        }, function(error) {
            console.error("Error: " + error.message);
            // Handle error - maybe show a message that location is required to use the site
        });
    } else {
        console.log("Geolocation is not available");
        // Handle lack of geolocation - maybe show a message that location is required to use the site
    }
}

document.addEventListener('DOMContentLoaded', checkLocation);

// Close modal when clicking on the close button or outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
    }
}

// Function to add product to cart (placeholder)
function addToCart(productId) {
    alert(`Product ${productId} added to cart!`);
    // In a real application, you would implement actual cart functionality here
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    // In a real application, you would send this data to a server
    console.log(`Form submitted: Name: ${name}, Email: ${email}, Message: ${message}`);
    alert('Thank you for your message. We will get back to you soon!');
    form.reset();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmission);
});
