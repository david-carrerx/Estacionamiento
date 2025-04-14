CREATE DATABASE IF NOT EXISTS parkingdb;
USE parkingdb;

CREATE TABLE IF NOT EXISTS parking_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  license_plate VARCHAR(10) NOT NULL,
  vehicle_type ENUM('oficial', 'residente', 'no_residente') NOT NULL,
  entry_time DATETIME NOT NULL,
  exit_time DATETIME,
  total_time_minutes INT,
  total_amount DECIMAL(10, 2)
);
