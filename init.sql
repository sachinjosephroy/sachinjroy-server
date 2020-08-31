/* CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter'); */

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255)
);

INSERT INTO employee (id, name, email, phone)
VALUES  (1, 'Genesis', 'genesis@example.com', '1245458965');