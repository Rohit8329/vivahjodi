-- ============================================================
-- V13__add_taluka_to_cities.sql
-- VivahJodi
--
-- Connect Maharashtra master cities to their talukas.
-- V12 remains unchanged.
-- ============================================================


-- ------------------------------------------------------------
-- Add taluka relationship to cities
-- ------------------------------------------------------------

ALTER TABLE cities
    ADD COLUMN IF NOT EXISTS taluka_id UUID;


-- ------------------------------------------------------------
-- Foreign key
-- ------------------------------------------------------------

ALTER TABLE cities
    DROP CONSTRAINT IF EXISTS fk_cities_taluka;

ALTER TABLE cities
    ADD CONSTRAINT fk_cities_taluka
        FOREIGN KEY (taluka_id)
        REFERENCES talukas(id);


-- ------------------------------------------------------------
-- Index
-- ------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_cities_taluka_id
    ON cities(taluka_id);


-- ============================================================
-- Maharashtra city → taluka mappings
-- ============================================================

UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Ahilyanagar'
  AND t.name = 'Ahilyanagar';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Akola'
  AND t.name = 'Akola';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Amravati'
  AND t.name = 'Amravati';


-- Thane district

UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Bhiwandi-Nizampur'
  AND t.name = 'Bhiwandi';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Mira-Bhayandar'
  AND t.name = 'Thane';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Kalyan-Dombivli'
  AND t.name = 'Kalyan';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Navi Mumbai'
  AND t.name = 'Thane';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Thane'
  AND t.name = 'Thane';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Ulhasnagar'
  AND t.name = 'Ulhasnagar';


-- Other Maharashtra cities

UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Mumbai'
  AND t.name = 'Colaba';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Chandrapur'
  AND t.name = 'Chandrapur';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Chhatrapati Sambhajinagar'
  AND t.name = 'Chhatrapati Sambhajinagar';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Dhule'
  AND t.name = 'Dhule';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Ichalkaranji'
  AND t.name = 'Hatkanangale';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Kolhapur'
  AND t.name = 'Karvir';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Jalgaon'
  AND t.name = 'Jalgaon';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Jalna'
  AND t.name = 'Jalna';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Latur'
  AND t.name = 'Latur';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Malegaon'
  AND t.name = 'Malegaon';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Nashik'
  AND t.name = 'Nashik';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Nagpur'
  AND t.name = 'Nagpur City';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Nanded-Waghala'
  AND t.name = 'Nanded';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Vasai-Virar'
  AND t.name = 'Vasai';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Parbhani'
  AND t.name = 'Parbhani';


-- Pune district

UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Pimpri-Chinchwad'
  AND t.name = 'Haveli';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Pune'
  AND t.name = 'Pune City';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Panvel'
  AND t.name = 'Panvel';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Sangli-Miraj-Kupwad'
  AND t.name = 'Miraj';


UPDATE cities c
SET taluka_id = t.id
FROM districts d
JOIN states s
    ON s.id = d.state_id
JOIN talukas t
    ON t.district_id = d.id
WHERE c.district_id = d.id
  AND s.code = 'MH'
  AND c.name = 'Solapur'
  AND t.name = 'North Solapur';


-- ------------------------------------------------------------
-- Validation
-- ------------------------------------------------------------

DO $$
DECLARE
    missing_taluka_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO missing_taluka_count
    FROM cities c
    JOIN districts d
        ON d.id = c.district_id
    JOIN states s
        ON s.id = d.state_id
    WHERE s.code = 'MH'
      AND c.taluka_id IS NULL;

    IF missing_taluka_count > 0 THEN
        RAISE EXCEPTION
            'V13 city/taluka mapping failed. % Maharashtra cities have no taluka mapping',
            missing_taluka_count;
    END IF;

END $$;