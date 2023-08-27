CREATE TABLE Caches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nazev VARCHAR(255),
  GC VARCHAR(255),
  lat DECIMAL(9,7),
  lon DECIMAL(9,7),
  typ VARCHAR(255)
);

-- Check Current Character Set and Collation:
SHOW CREATE TABLE Caches;

-- Alter Table to Support utf8mb4:
ALTER TABLE Caches CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

