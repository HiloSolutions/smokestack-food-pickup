DROP TABLE IF EXISTS order_meals CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS meals CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  sub VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  admin_access VARCHAR(255) DEFAULT false,
  date_added DATE DEFAUlT CURRENT_DATE
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  est_completion_time SMALLINT DEFAULT 30,
  order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_fulfilled BOOLEAN DEFAULT FALSE,
  special_instructions TEXT,
  date_added DATE DEFAUlT CURRENT_DATE
);

CREATE TABLE meals (
  id SERIAL PRIMARY KEY,
  img TEXT,
  meal_name TEXT,
  price NUMERIC(10, 2),
  rate NUMERIC(3, 1),
  menu_category TEXT
);

CREATE TABLE order_meals (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  meal_id INTEGER,
  meal_quantity INTEGER NOT NULL
);