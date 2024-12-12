<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$product_id = $_GET['id']; // Get product ID from query string

$sql = "SELECT p.*, s.name AS strain_name, s.type AS strain_type, 
               lr.thc_content, lr.cbd_content, lr.other_cannabinoids, lr.terpenes AS lab_terpenes
        FROM products p
        LEFT JOIN strains s ON p.strain_id = s.id
        LEFT JOIN lab_results lr ON p.id = lr.product_id
        WHERE p.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
    
    // Get terpenes for this product
    $terpene_sql = "SELECT t.name, pt.percentage
                    FROM product_terpenes pt
                    JOIN terpenes t ON pt.terpene_id = t.id
                    WHERE pt.product_id = ?";
    $terpene_stmt = $conn->prepare($terpene_sql);
    $terpene_stmt->bind_param("i", $product_id);
    $terpene_stmt->execute();
    $terpene_result = $terpene_stmt->get_result();
    
    $product['terpenes'] = [];
    while ($terpene = $terpene_result->fetch_assoc()) {
        $product['terpenes'][] = $terpene;
    }
    
    echo json_encode($product);
} else {
    echo "Product not found";
}

$conn->close();
?>
