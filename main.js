// Sample product data
const products = [
    { id: 1, name: "CBD Oil", price: 49.99, description: "High-quality CBD oil for pain relief" },
    { id: 2, name: "THC Gummies", price: 29.99, description: "Delicious THC-infused gummies for relaxation" },
    { id: 3, name: "Cannabis Flower", price: 39.99, description: "Premium cannabis flower, various strains available" },
];

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
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
