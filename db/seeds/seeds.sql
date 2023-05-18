INSERT INTO users (id, sub, customer_name, phone_number, admin_access)
VALUES
(1, 'google-oauth2|106985537467241346399', 'Lauren Customer', '7801112222', false),
(2, 'windowslive|9dd91a882c41e6b6', 'Lauren Admin', '7801112222', true);


INSERT INTO orders (customer_id, est_completion_time, is_fulfilled, special_instructions)
VALUES (1, 20, FALSE, 'This is order 1'),
(2, 30, TRUE, 'This is order 2'),
(1, 30, FALSE, 'This is order 3'),
(1, 20, FALSE, 'This is order 4'),
(2, 30, TRUE, 'This is order 5'),
(1, 30, FALSE, 'This is order 6'),
(1, 20, FALSE, 'This is order 7'),
(2, 30, TRUE, 'This is order 8'),
(1, 30, FALSE, 'This is order 9'),
(1, 20, FALSE, 'This is order 10');

INSERT INTO meals (id, img, meal_name, price, rate, menu_category)
VALUES
  (1, '../images/grandmas-slow-cooker-brisket.jpeg', 'Grandma''s Slow-Cooker Brisket', 13.99, 4, 'briskets'),
  (2, '../images/classic-brisket.jpeg', 'Classic Brisket', 12.99, 4.5, 'briskets'),
  (3, '../images/maple-garlic-brisket.jpeg', 'Maple Garlic Brisket', 17.99, 4.8, 'briskets'),
  (4, '../images/spicy-fried-chicken.jpg', 'Spicy Fried Chicken', 10.99, 4, 'friedChicken'),
  (5, '../images/terriyaki-fried-chicken.jpeg', 'Terriyaki Fried Chicken', 15.99, 5, 'friedChicken'),
  (6, '../images/fried-chicken-with-garlic-aioli.jpg', 'Fried Chicken with Garlic Aioli', 12.99, 3, 'friedChicken'),
  (7, '../images/veggie-sandwich.webp', 'Rainbow Veggie Sandwich', 13.99, 4, 'sandwiches'),
  (8, '../images/caprese-sandwich.jpeg', 'Caprese Sandwich', 15.99, 5, 'sandwiches'),
  (9, '../images/spinach-feta-sandwich.jpeg', 'Spinach Feta Sandwich', 12.99, 3.2, 'sandwiches');

INSERT INTO order_meals (order_id, meal_id, meal_quantity)
VALUES
  (1, 1, 2),
  (1, 4, 1),
  (2, 2, 1),
  (2, 7, 2),
  (3, 3, 1),
  (3, 8, 1),
  (4, 1, 1),
  (4, 6, 2),
  (5, 5, 3),
  (5, 9, 1),
  (6, 2, 2),
  (6, 4, 1),
  (7, 3, 1),
  (7, 7, 2),
  (8, 1, 1),
  (8, 8, 1),
  (9, 5, 2),
  (9, 6, 1),
  (10, 3, 3),
  (10, 9, 1);

