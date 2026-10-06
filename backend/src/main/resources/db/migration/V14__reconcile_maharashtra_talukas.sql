-- ============================================================
-- V14__reconcile_maharashtra_talukas.sql
-- VivahJodi
--
-- Reconcile Maharashtra taluka master data against the
-- authoritative 36-district / 358-taluka specification.
--
-- Corrections:
--   1. Mumbai City has no talukas.
--   2. Nanded: Naigaon -> Naigaon (Khairgaon)
--   3. Nanded: add Kundalwadi
--
-- V11 is intentionally NOT modified.
-- ============================================================


-- ============================================================
-- 1. Detach the existing Mumbai city record from Colaba.
--
-- The current cities table contains:
--   Mumbai City -> Colaba -> Mumbai
--
-- Mumbai City must have zero talukas according to the
-- authoritative specification.
-- ============================================================

UPDATE cities
SET taluka_id = NULL
WHERE name = 'Mumbai'
  AND district_id = (
      SELECT d.id
      FROM districts d
      JOIN states s
        ON s.id = d.state_id
      WHERE d.name = 'Mumbai City'
        AND s.code = 'MH'
  );


-- ============================================================
-- 2. Remove the two incorrect Mumbai City talukas.
-- ============================================================

DELETE FROM talukas
WHERE district_id = (
    SELECT d.id
    FROM districts d
    JOIN states s
      ON s.id = d.state_id
    WHERE d.name = 'Mumbai City'
      AND s.code = 'MH'
)
AND name IN ('Colaba', 'Dadar');


-- ============================================================
-- 3. Correct Nanded taluka name.
--
-- Existing:
--   Naigaon
--
-- Required:
--   Naigaon (Khairgaon)
-- ============================================================

UPDATE talukas
SET name = 'Naigaon (Khairgaon)'
WHERE name = 'Naigaon'
  AND district_id = (
      SELECT d.id
      FROM districts d
      JOIN states s
        ON s.id = d.state_id
      WHERE d.name = 'Nanded'
        AND s.code = 'MH'
  );


-- ============================================================
-- 4. Add missing Nanded taluka: Kundalwadi.
-- ============================================================

INSERT INTO talukas (
    district_id,
    name,
    is_active
)
SELECT
    d.id,
    'Kundalwadi',
    true
FROM districts d
JOIN states s
  ON s.id = d.state_id
WHERE d.name = 'Nanded'
  AND s.code = 'MH'
  AND NOT EXISTS (
      SELECT 1
      FROM talukas t
      WHERE t.district_id = d.id
        AND LOWER(TRIM(t.name)) = LOWER(TRIM('Kundalwadi'))
  );



-- ============================================================
-- 5. Correct Raigad taluka master data.
--
-- Current DB contains Matheran, which is not part of the
-- authoritative 15-taluka Raigad specification.
--
-- Also normalize:
--   Sudhagad-Pali
--       ->
--   Sudhagad (Pali)
-- ============================================================

DELETE FROM talukas
WHERE name = 'Matheran'
  AND district_id = (
      SELECT d.id
      FROM districts d
      JOIN states s
        ON s.id = d.state_id
      WHERE d.name = 'Raigad'
        AND s.code = 'MH'
  );


UPDATE talukas
SET name = 'Sudhagad (Pali)'
WHERE name = 'Sudhagad-Pali'
  AND district_id = (
      SELECT d.id
      FROM districts d
      JOIN states s
        ON s.id = d.state_id
      WHERE d.name = 'Raigad'
        AND s.code = 'MH'
  );



-- ============================================================
-- 6. Validation — Mumbai City must have zero talukas.
-- ============================================================

DO $$
DECLARE
    mumbai_city_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO mumbai_city_count
    FROM talukas t
    JOIN districts d
      ON d.id = t.district_id
    JOIN states s
      ON s.id = d.state_id
    WHERE s.code = 'MH'
      AND d.name = 'Mumbai City';

    IF mumbai_city_count <> 0 THEN
        RAISE EXCEPTION
            'V14 validation failed. Mumbai City must have 0 talukas, found %',
            mumbai_city_count;
    END IF;

END $$;


-- ============================================================
-- 7. Validation — Nanded must have exactly 16 talukas.
-- ============================================================

DO $$
DECLARE
    nanded_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO nanded_count
    FROM talukas t
    JOIN districts d
      ON d.id = t.district_id
    JOIN states s
      ON s.id = d.state_id
    WHERE s.code = 'MH'
      AND d.name = 'Nanded';

    IF nanded_count <> 16 THEN
        RAISE EXCEPTION
            'V14 validation failed. Nanded must have 16 talukas, found %',
            nanded_count;
    END IF;

END $$;


-- ============================================================
-- 8. Validation — Raigad must have exactly 15 talukas.
-- ============================================================

DO $$
DECLARE
    raigad_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO raigad_count
    FROM talukas t
    JOIN districts d
      ON d.id = t.district_id
    JOIN states s
      ON s.id = d.state_id
    WHERE s.code = 'MH'
      AND d.name = 'Raigad';

    IF raigad_count <> 15 THEN
        RAISE EXCEPTION
            'V14 validation failed. Raigad must have 15 talukas, found %',
            raigad_count;
    END IF;

END $$;


-- ============================================================
-- 9. Validation — Maharashtra must have exactly 358 talukas.
-- ============================================================

DO $$
DECLARE
    maharashtra_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO maharashtra_count
    FROM talukas t
    JOIN districts d
      ON d.id = t.district_id
    JOIN states s
      ON s.id = d.state_id
    WHERE s.code = 'MH';

    IF maharashtra_count <> 358 THEN
        RAISE EXCEPTION
            'V14 validation failed. Maharashtra must have 358 talukas, found %',
            maharashtra_count;
    END IF;

END $$;


-- ============================================================
-- 10. Validation — required Nanded talukas must exist.
-- ============================================================

DO $$
DECLARE
    required_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO required_count
    FROM talukas t
    JOIN districts d
      ON d.id = t.district_id
    JOIN states s
      ON s.id = d.state_id
    WHERE s.code = 'MH'
      AND d.name = 'Nanded'
      AND t.name IN (
          'Ardhapur',
          'Bhokar',
          'Biloli',
          'Deglur',
          'Dharmabad',
          'Hadgaon',
          'Himayatnagar',
          'Kinwat',
          'Loha',
          'Mahur',
          'Mudkhed',
          'Mukhed',
          'Naigaon (Khairgaon)',
          'Nanded',
          'Umri',
          'Kundalwadi'
      );

    IF required_count <> 16 THEN
        RAISE EXCEPTION
            'V14 validation failed. Expected all 16 authoritative Nanded talukas, found %',
            required_count;
    END IF;

END $$;