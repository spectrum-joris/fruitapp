CREATE TABLE fruits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  price DECIMAL(5, 2)
);

INSERT INTO fruits (name, price) VALUES
('Oranges', 0.59),
('Apples', 0.32),
('Bananas', 0.48),
('Cherries', 3.00),
('Mangoes', 0.56),
('Papayas', 2.79);

select * from fruits;
