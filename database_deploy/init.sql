CREATE TABLE IF NOT EXISTS measurements (
    id serial PRIMARY KEY,
    temperature REAL NOT NULL,
    humidity REAL NOT NULL
);