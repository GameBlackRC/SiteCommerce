DROP TABLE IF EXISTS ProductCommand;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Command;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Category;

CREATE TABLE Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    urlImg VARCHAR(500),
    idCategory INT,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idCategory) REFERENCES Category(id) ON DELETE SET NULL
);

CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Command (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idAccount INT NOT NULL,
    statut ENUM('panier', 'en cours', 'expédié', 'livré') NOT NULL DEFAULT 'panier',
    FOREIGN KEY (idAccount) REFERENCES Account(id) ON DELETE CASCADE
);

CREATE TABLE ProductCommand (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCommand INT NOT NULL,
    idProduct INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (idCommand) REFERENCES Command(id) ON DELETE CASCADE,
    FOREIGN KEY (idProduct) REFERENCES Product(id) ON DELETE CASCADE
);

INSERT INTO Account (login, mail, password) VALUES
('user1', 'user1@example.com', 'hashed_password_1'),
('user2', 'user2@example.com', 'hashed_password_2'),
('user3', 'user3@example.com', 'hashed_password_3');

INSERT INTO Category (name) VALUES
('Électronique'),
('Vêtements'),
('Livres'),
('Meubles');

INSERT INTO Product (name, urlImg, idCategory, description, price) VALUES
('Smartphone X', 'https://example.com/smartphone.jpg', 1, 'Un smartphone haut de gamme avec un excellent appareil photo.', 799.99),
('T-shirt Noir', 'https://example.com/tshirt.jpg', 2, 'T-shirt en coton de haute qualité.', 19.99),
('Roman Fantastique', 'https://example.com/book.jpg', 3, 'Un best-seller de la littérature fantastique.', 14.99),
('Table en Chêne', 'https://example.com/table.jpg', 4, 'Table robuste en bois massif.', 299.99);

INSERT INTO Command (idAccount, statut) VALUES
(1, 'en cours'),
(2, 'expédié'),
(3, 'panier'),
(1, 'livré');

INSERT INTO ProductCommand (idCommand, idProduct, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 3),
(2, 4, 1),
(3, 1, 1),
(3, 2, 2),
(4, 3, 1);