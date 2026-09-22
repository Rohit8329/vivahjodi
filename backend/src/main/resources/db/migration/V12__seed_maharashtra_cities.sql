-- ============================================================
-- V12__seed_maharashtra_cities.sql
-- VivahJodi
--
-- Maharashtra Municipal Corporation city master data.
-- ============================================================

INSERT INTO cities (
    state_id,
    district_id,
    name,
    is_active
)
SELECT
    s.id,
    d.id,
    x.city_name,
    true
FROM (
    VALUES
        ('Ahilyanagar', 'Ahilyanagar'),
        ('Akola', 'Akola'),
        ('Amravati', 'Amravati'),

        ('Bhiwandi-Nizampur', 'Thane'),
        ('Mira-Bhayandar', 'Thane'),
        ('Kalyan-Dombivli', 'Thane'),
        ('Navi Mumbai', 'Thane'),
        ('Thane', 'Thane'),
        ('Ulhasnagar', 'Thane'),

        ('Mumbai', 'Mumbai City'),

        ('Chandrapur', 'Chandrapur'),

        ('Chhatrapati Sambhajinagar', 'Chhatrapati Sambhajinagar'),

        ('Dhule', 'Dhule'),

        ('Ichalkaranji', 'Kolhapur'),
        ('Kolhapur', 'Kolhapur'),

        ('Jalgaon', 'Jalgaon'),
        ('Jalna', 'Jalna'),
        ('Latur', 'Latur'),

        ('Malegaon', 'Nashik'),
        ('Nashik', 'Nashik'),

        ('Nagpur', 'Nagpur'),

        ('Nanded-Waghala', 'Nanded'),

        ('Vasai-Virar', 'Palghar'),

        ('Parbhani', 'Parbhani'),

        ('Pimpri-Chinchwad', 'Pune'),
        ('Pune', 'Pune'),

        ('Panvel', 'Raigad'),

        ('Sangli-Miraj-Kupwad', 'Sangli'),

        ('Solapur', 'Solapur')

) AS x(city_name, district_name)

JOIN states s
    ON s.code = 'MH'
   AND s.is_active = true

JOIN districts d
    ON d.state_id = s.id
   AND d.name = x.district_name
   AND d.is_active = true;


-- ------------------------------------------------------------
-- Validate Maharashtra city count
-- ------------------------------------------------------------

DO $$
DECLARE
    city_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO city_count
    FROM cities c
    JOIN districts d
        ON d.id = c.district_id
    JOIN states s
        ON s.id = d.state_id
    WHERE s.code = 'MH';

    IF city_count <> 29 THEN
        RAISE EXCEPTION
            'V12 city seed failed. Expected 29 Maharashtra cities, found %',
            city_count;
    END IF;

END $$;


-- ------------------------------------------------------------
-- Validate duplicate city/district combinations
-- ------------------------------------------------------------

DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO duplicate_count
    FROM (
        SELECT
            c.district_id,
            LOWER(TRIM(c.name)) AS normalized_name
        FROM cities c
        JOIN districts d
            ON d.id = c.district_id
        JOIN states s
            ON s.id = d.state_id
        WHERE s.code = 'MH'
        GROUP BY
            c.district_id,
            LOWER(TRIM(c.name))
        HAVING COUNT(*) > 1
    ) duplicates;

    IF duplicate_count > 0 THEN
        RAISE EXCEPTION
            'V12 city seed failed. Found % duplicate city/district combinations',
            duplicate_count;
    END IF;

END $$;