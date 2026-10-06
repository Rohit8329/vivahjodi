-- ============================================================
-- V16 — Occupation Master Data
-- India-wide / General Purpose
-- ============================================================

-- ------------------------------------------------------------
-- 1. Occupation categories
-- ------------------------------------------------------------

CREATE TABLE occupation_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL UNIQUE,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_occupation_categories_active_order
    ON occupation_categories(is_active, display_order);


-- ------------------------------------------------------------
-- 2. Occupations / Sub-occupations
-- ------------------------------------------------------------

CREATE TABLE occupations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    category_id UUID NOT NULL,

    name VARCHAR(200) NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_occupations_category
        FOREIGN KEY (category_id)
        REFERENCES occupation_categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_occupations_category_name
        UNIQUE (category_id, name)
);

CREATE INDEX idx_occupations_category
    ON occupations(category_id);

CREATE INDEX idx_occupations_category_active_order
    ON occupations(category_id, is_active, display_order);


-- ------------------------------------------------------------
-- 3. Employment types
-- ------------------------------------------------------------

CREATE TABLE employment_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(100) NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employment_types_active_order
    ON employment_types(is_active, display_order);


-- ------------------------------------------------------------
-- 4. Employment sectors
-- ------------------------------------------------------------

CREATE TABLE employment_sectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(120) NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employment_sectors_active_order
    ON employment_sectors(is_active, display_order);


-- ============================================================
-- Seed occupation categories
-- ============================================================

INSERT INTO occupation_categories
    (name, display_order)
VALUES
    ('IT / Software / Technology', 1),
    ('Engineering', 2),
    ('Medical / Healthcare', 3),
    ('Pharmacy', 4),
    ('Science / Research', 5),
    ('Education / Teaching', 6),
    ('Government / Public Administration', 7),
    ('Defence / Armed Forces', 8),
    ('Police / Security', 9),
    ('Law / Legal', 10),
    ('Finance / Banking / Insurance', 11),
    ('Accounting / Taxation', 12),
    ('Business / Entrepreneurship', 13),
    ('Sales / Marketing', 14),
    ('Human Resources', 15),
    ('Management / Administration', 16),
    ('Agriculture / Farming', 17),
    ('Architecture / Planning', 18),
    ('Construction / Civil / Real Estate', 19),
    ('Skilled Trades / Technical Services', 20),
    ('Manufacturing / Production', 21),
    ('Automobile / Transport', 22),
    ('Aviation', 23),
    ('Hospitality / Tourism', 24),
    ('Media / Journalism / Communication', 25),
    ('Arts / Design / Creative', 26),
    ('Social Work / NGO', 27),
    ('Sports / Fitness', 28),
    ('Beauty / Fashion / Personal Care', 29),
    ('Retail / E-commerce', 30),
    ('Logistics / Supply Chain', 31),
    ('Consulting / Freelancing', 32),
    ('Domestic / Homemaker', 33),
    ('Student / Intern', 34),
    ('Retired', 35),
    ('Other', 36);


-- ============================================================
-- Seed employment types
-- ============================================================

INSERT INTO employment_types
    (code, name, display_order)
VALUES
    ('FULL_TIME', 'Full Time', 1),
    ('PART_TIME', 'Part Time', 2),
    ('SELF_EMPLOYED', 'Self Employed', 3),
    ('BUSINESS', 'Business', 4),
    ('CONTRACT', 'Contract', 5),
    ('FREELANCE', 'Freelance', 6),
    ('INTERNSHIP', 'Internship', 7),
    ('APPRENTICESHIP', 'Apprenticeship', 8),
    ('RETIRED', 'Retired', 9),
    ('HOMEMAKER', 'Homemaker', 10),
    ('STUDENT', 'Student', 11),
    ('OTHER', 'Other', 12);


-- ============================================================
-- Seed employment sectors
-- ============================================================

INSERT INTO employment_sectors
    (code, name, display_order)
VALUES
    ('GOVERNMENT', 'Government', 1),
    ('PRIVATE', 'Private Sector', 2),
    ('PSU', 'Public Sector / PSU', 3),
    ('FAMILY_BUSINESS', 'Family Business', 4),
    ('SELF_EMPLOYED', 'Self Employed', 5),
    ('NGO', 'NGO / Non-Profit', 6),
    ('INTERNATIONAL_ORGANIZATION', 'International Organization', 7),
    ('COOPERATIVE', 'Co-operative Sector', 8),
    ('OTHER', 'Other', 9);