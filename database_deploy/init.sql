CREATE TABLE IF NOT EXISTS measurements (
    time bigint PRIMARY KEY,
    temperature REAL NOT NULL,
    humidity REAL NOT NULL,
    serialnumber decimal(6) NOT NULL
);
