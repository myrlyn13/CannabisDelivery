CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    strain_id INT,
    potency VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (strain_id) REFERENCES strains(id)
);
CREATE TABLE strains (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('Indica', 'Sativa', 'Hybrid', 'CBD') NOT NULL,
    description TEXT
);
CREATE TABLE lab_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    test_date DATE NOT NULL,
    thc_content DECIMAL(5, 2),
    cbd_content DECIMAL(5, 2),
    other_cannabinoids TEXT,
    terpenes TEXT,
    contaminants TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE product_terpenes (
    product_id INT,
    terpene_id INT,
    percentage DECIMAL(5, 2),
    PRIMARY KEY (product_id, terpene_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (terpene_id) REFERENCES terpenes(id)
);
CREATE TABLE terpenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
