-- ============================================================
-- VivahJodi V5
-- Expand matrimonial profile system
-- ============================================================

-- ------------------------------------------------------------
-- 1. Extend existing profiles table
-- ------------------------------------------------------------

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS gotra VARCHAR(100),
    ADD COLUMN IF NOT EXISTS zodiac_sign VARCHAR(50),
    ADD COLUMN IF NOT EXISTS nakshatra VARCHAR(100),
    ADD COLUMN IF NOT EXISTS manglik_status VARCHAR(50),
    ADD COLUMN IF NOT EXISTS native_place VARCHAR(150),
    ADD COLUMN IF NOT EXISTS state VARCHAR(100),
    ADD COLUMN IF NOT EXISTS district VARCHAR(100),
    ADD COLUMN IF NOT EXISTS taluka VARCHAR(100),
    ADD COLUMN IF NOT EXISTS city VARCHAR(100);


-- ------------------------------------------------------------
-- 2. Education details
-- ------------------------------------------------------------

CREATE TABLE education_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,

    education_level VARCHAR(100),
    education_stream VARCHAR(100),
    qualification VARCHAR(200),
    specialization VARCHAR(200),
    institute_name VARCHAR(250),
    passing_year INTEGER,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_education_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_education_profile_id
    ON education_details(profile_id);


-- ------------------------------------------------------------
-- 3. Family details
-- ------------------------------------------------------------

CREATE TABLE family_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE,

    father_name VARCHAR(150),
    father_occupation VARCHAR(200),

    mother_name VARCHAR(150),
    mother_occupation VARCHAR(200),

    family_type VARCHAR(50),
    family_values VARCHAR(100),
    family_status VARCHAR(100),

    siblings_count INTEGER,
    brothers_count INTEGER,
    sisters_count INTEGER,

    native_place VARCHAR(150),
    family_about TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_family_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_family_profile_id
    ON family_details(profile_id);


-- ------------------------------------------------------------
-- 4. Relatives
-- ------------------------------------------------------------

CREATE TABLE relatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,

    name VARCHAR(150) NOT NULL,
    relation VARCHAR(100),
    city VARCHAR(100),
    occupation VARCHAR(200),
    contact_visible BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_relatives_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_relatives_profile_id
    ON relatives(profile_id);


-- ------------------------------------------------------------
-- 5. Occupation / career
-- ------------------------------------------------------------

CREATE TABLE occupation_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE,

    occupation VARCHAR(150),
    designation VARCHAR(150),
    company_name VARCHAR(200),
    employment_type VARCHAR(100),
    work_city VARCHAR(100),
    work_state VARCHAR(100),
    annual_income_inr NUMERIC(12, 2),
    business_details TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_occupation_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_occupation_profile_id
    ON occupation_details(profile_id);


-- ------------------------------------------------------------
-- 6. Profile photos
-- ------------------------------------------------------------

CREATE TABLE profile_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,

    storage_path VARCHAR(500) NOT NULL,
    original_file_name VARCHAR(255),
    content_type VARCHAR(100),
    file_size_bytes BIGINT,

    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,

    photo_status VARCHAR(30) NOT NULL DEFAULT 'PENDING_REVIEW',

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_profile_photos_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_profile_photos_profile_id
    ON profile_photos(profile_id);

CREATE INDEX idx_profile_photos_primary
    ON profile_photos(profile_id, is_primary);

CREATE INDEX idx_profile_photos_status
    ON profile_photos(photo_status);


-- ------------------------------------------------------------
-- 7. Partner preferences
-- ------------------------------------------------------------

CREATE TABLE partner_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE,

    min_age INTEGER,
    max_age INTEGER,

    min_height_cm INTEGER,
    max_height_cm INTEGER,

    religion VARCHAR(50),
    caste VARCHAR(100),
    sub_caste VARCHAR(100),

    education_level VARCHAR(100),
    education_stream VARCHAR(100),

    state VARCHAR(100),
    district VARCHAR(100),
    taluka VARCHAR(100),
    city VARCHAR(100),

    preferred_occupation VARCHAR(150),

    additional_preferences TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_partner_preferences_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_partner_preferences_profile_id
    ON partner_preferences(profile_id);


-- ------------------------------------------------------------
-- 8. States
-- ------------------------------------------------------------

CREATE TABLE states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20),
    country_name VARCHAR(100) NOT NULL DEFAULT 'India',
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_states_name
    ON states(name);


-- ------------------------------------------------------------
-- 9. Districts
-- ------------------------------------------------------------

CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID NOT NULL,

    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_district_state
        FOREIGN KEY (state_id)
        REFERENCES states(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_district_state_name
        UNIQUE (state_id, name)
);

CREATE INDEX idx_districts_state_id
    ON districts(state_id);

CREATE INDEX idx_districts_name
    ON districts(name);


-- ------------------------------------------------------------
-- 10. Talukas / Tehsils
-- ------------------------------------------------------------

CREATE TABLE talukas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID NOT NULL,

    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_taluka_district
        FOREIGN KEY (district_id)
        REFERENCES districts(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_taluka_district_name
        UNIQUE (district_id, name)
);

CREATE INDEX idx_talukas_district_id
    ON talukas(district_id);

CREATE INDEX idx_talukas_name
    ON talukas(name);


-- ------------------------------------------------------------
-- 11. Cities
-- ------------------------------------------------------------

CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID NOT NULL,
    district_id UUID,

    name VARCHAR(150) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_city_state
        FOREIGN KEY (state_id)
        REFERENCES states(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_city_district
        FOREIGN KEY (district_id)
        REFERENCES districts(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_cities_state_id
    ON cities(state_id);

CREATE INDEX idx_cities_district_id
    ON cities(district_id);

CREATE INDEX idx_cities_name
    ON cities(name);


-- ------------------------------------------------------------
-- 12. Education levels
-- ------------------------------------------------------------

CREATE TABLE education_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_education_levels_order
    ON education_levels(display_order);


-- ------------------------------------------------------------
-- 13. Education streams
-- ------------------------------------------------------------

CREATE TABLE education_streams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_education_streams_order
    ON education_streams(display_order);


-- ------------------------------------------------------------
-- 14. Zodiac signs / Raas
-- ------------------------------------------------------------

CREATE TABLE zodiac_signs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_zodiac_signs_order
    ON zodiac_signs(display_order);


-- ------------------------------------------------------------
-- 15. Nakshatras
-- ------------------------------------------------------------

CREATE TABLE nakshatras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_nakshatras_order
    ON nakshatras(display_order);
