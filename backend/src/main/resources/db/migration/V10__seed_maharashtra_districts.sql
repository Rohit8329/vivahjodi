-- ============================================================
-- VivahJodi - V10
-- Maharashtra - 36 Districts
-- ============================================================

INSERT INTO districts (state_id, name, is_active)
SELECT
    s.id,
    d.name,
    true
FROM states s
CROSS JOIN (
    VALUES
        ('Mumbai City'),
        ('Mumbai Suburban'),
        ('Thane'),
        ('Palghar'),
        ('Raigad'),
        ('Ratnagiri'),
        ('Sindhudurg'),

        ('Pune'),
        ('Satara'),
        ('Sangli'),
        ('Kolhapur'),
        ('Solapur'),

        ('Nashik'),
        ('Dhule'),
        ('Nandurbar'),
        ('Jalgaon'),
        ('Ahilyanagar'),

        ('Chhatrapati Sambhajinagar'),
        ('Jalna'),
        ('Beed'),
        ('Dharashiv'),
        ('Latur'),
        ('Nanded'),
        ('Parbhani'),
        ('Hingoli'),

        ('Amravati'),
        ('Akola'),
        ('Buldhana'),
        ('Washim'),
        ('Yavatmal'),

        ('Nagpur'),
        ('Wardha'),
        ('Bhandara'),
        ('Gondia'),
        ('Chandrapur'),
        ('Gadchiroli')
) AS d(name)
WHERE s.code = 'MH';

-- ============================================================
-- Verification
-- ============================================================

DO $$
DECLARE
    district_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO district_count
    FROM districts d
    JOIN states s ON s.id = d.state_id
    WHERE s.code = 'MH';

    IF district_count <> 36 THEN
        RAISE EXCEPTION
            'Maharashtra district seed failed. Expected 36, found %',
            district_count;
    END IF;
END $$;