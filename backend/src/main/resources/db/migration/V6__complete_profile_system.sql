-- ============================================================
-- VivahJodi
-- V6__complete_profile_system.sql
--
-- Purpose:
-- Expand the V5 profile foundation for the evolving
-- matrimonial profile/search system.
--
-- IMPORTANT:
-- This migration is intentionally extensible.
-- Future reference-site discoveries can be added through
-- later migrations (V7, V8, ...).
-- ============================================================


-- ============================================================
-- 1. PROFILES
-- ============================================================

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS profile_code VARCHAR(20);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS time_of_birth TIME;

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS birth_place VARCHAR(150);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS number_of_children INTEGER;

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS blood_group VARCHAR(20);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS complexion VARCHAR(50);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS body_type VARCHAR(50);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS physical_disability BOOLEAN
        NOT NULL DEFAULT FALSE;

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS disability_details VARCHAR(500);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS eating_habits VARCHAR(50);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS drinking_habits VARCHAR(50);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS smoking_habits VARCHAR(50);


-- ============================================================
-- 2. CURRENT LOCATION
--
-- Existing V5:
-- state
-- district
-- taluka
-- city
--
-- Those existing fields remain untouched.
-- V6 adds explicit country/address/pincode fields.
-- ============================================================

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS current_country VARCHAR(100)
        DEFAULT 'India';

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS current_address VARCHAR(500);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS current_pincode VARCHAR(20);


-- ============================================================
-- 3. NATIVE LOCATION
--
-- Existing V5 native_place remains available.
-- V6 adds structured native location fields.
-- ============================================================

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS native_country VARCHAR(100)
        DEFAULT 'India';

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS native_state VARCHAR(100);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS native_district VARCHAR(100);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS native_taluka VARCHAR(100);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS native_city VARCHAR(100);


-- ============================================================
-- 4. NRI INFORMATION
-- ============================================================

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS is_nri BOOLEAN
        NOT NULL DEFAULT FALSE;

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS living_country VARCHAR(100);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS nri_address VARCHAR(500);


-- ============================================================
-- 5. PROFILE REVIEW / VISIBILITY
-- ============================================================

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS visibility VARCHAR(30)
        NOT NULL DEFAULT 'PRIVATE';

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ;

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS rejection_reason VARCHAR(1000);


-- ============================================================
-- 6. PROFILE CODE
--
-- Public matrimonial ID.
--
-- Example:
-- VJ100001
-- VJ100002
--
-- Internal UUID remains the real database identifier.
-- ============================================================

CREATE SEQUENCE IF NOT EXISTS vivahjodi_profile_code_seq
    START WITH 100001
    INCREMENT BY 1;


-- Generate profile codes for existing rows that don't have one.
DO $$
DECLARE
    profile_record RECORD;
BEGIN
    FOR profile_record IN
        SELECT id
        FROM profiles
        WHERE profile_code IS NULL
        ORDER BY created_at, id
    LOOP
        UPDATE profiles
        SET profile_code =
            'VJ' ||
            nextval('vivahjodi_profile_code_seq')
        WHERE id = profile_record.id;
    END LOOP;
END $$;


CREATE UNIQUE INDEX IF NOT EXISTS
    ux_profiles_profile_code
ON profiles(profile_code);


CREATE INDEX IF NOT EXISTS
    idx_profiles_profile_status
ON profiles(profile_status);


CREATE INDEX IF NOT EXISTS
    idx_profiles_visibility
ON profiles(visibility);


CREATE INDEX IF NOT EXISTS
    idx_profiles_gender
ON profiles(gender);


CREATE INDEX IF NOT EXISTS
    idx_profiles_date_of_birth
ON profiles(date_of_birth);


CREATE INDEX IF NOT EXISTS
    idx_profiles_current_location
ON profiles(
    state,
    district,
    taluka,
    city
);


CREATE INDEX IF NOT EXISTS
    idx_profiles_native_location
ON profiles(
    native_state,
    native_district,
    native_taluka,
    native_city
);


-- ============================================================
-- 7. FAMILY DETAILS
--
-- V5 already created family_details.
-- Add the richer matrimonial information without deleting
-- anything from V5.
-- ============================================================

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS father_name VARCHAR(150);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS father_occupation VARCHAR(150);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS mother_name VARCHAR(150);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS mother_occupation VARCHAR(150);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS number_of_brothers INTEGER;

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS brothers_married INTEGER;

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS number_of_sisters INTEGER;

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS sisters_married INTEGER;

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS family_type VARCHAR(50);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS family_values VARCHAR(100);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS family_status VARCHAR(100);

ALTER TABLE family_details
    ADD COLUMN IF NOT EXISTS parental_details VARCHAR(1000);


-- ============================================================
-- 8. RELATIVES
--
-- V5 already created relatives.
-- Make the structure flexible enough for multiple relatives.
-- ============================================================

ALTER TABLE relatives
    ADD COLUMN IF NOT EXISTS name VARCHAR(150);

ALTER TABLE relatives
    ADD COLUMN IF NOT EXISTS relation VARCHAR(100);

ALTER TABLE relatives
    ADD COLUMN IF NOT EXISTS surname VARCHAR(100);

ALTER TABLE relatives
    ADD COLUMN IF NOT EXISTS occupation VARCHAR(150);

ALTER TABLE relatives
    ADD COLUMN IF NOT EXISTS location VARCHAR(250);

ALTER TABLE relatives
    ADD COLUMN IF NOT EXISTS notes VARCHAR(500);


CREATE INDEX IF NOT EXISTS
    idx_relatives_profile_id
ON relatives(profile_id);


-- ============================================================
-- 9. OCCUPATION DETAILS
-- ============================================================

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS occupation VARCHAR(150);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS sub_occupation VARCHAR(150);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS employment_type VARCHAR(100);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS employed_in VARCHAR(100);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS company_name VARCHAR(250);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS designation VARCHAR(150);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS work_location VARCHAR(250);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS annual_income NUMERIC(15,2);

ALTER TABLE occupation_details
    ADD COLUMN IF NOT EXISTS income_currency VARCHAR(10)
        DEFAULT 'INR';


-- ============================================================
-- 10. PARTNER PREFERENCES
-- ============================================================

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS age_from INTEGER;

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS age_to INTEGER;

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS height_from_cm INTEGER;

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS height_to_cm INTEGER;

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS marital_status VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS mother_tongue VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS physical_disability_preference VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS has_children VARCHAR(50);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS eating_habits VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS smoking_habits VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS drinking_habits VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS religion VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS caste VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS sub_caste VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS zodiac_sign VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS nakshatra VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS manglik_status VARCHAR(100);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS education VARCHAR(250);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS occupation VARCHAR(250);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS annual_income_from NUMERIC(15,2);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS annual_income_to NUMERIC(15,2);

ALTER TABLE partner_preferences
    ADD COLUMN IF NOT EXISTS about_partner VARCHAR(2000);


-- ============================================================
-- 11. IDENTITY DOCUMENTS
--
-- PRIVATE DOCUMENT STORAGE.
--
-- IMPORTANT:
-- These files must NOT be exposed as public profile photos.
-- Actual file storage will later use Supabase Storage.
-- ============================================================

CREATE TABLE IF NOT EXISTS identity_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL,

    document_type VARCHAR(100) NOT NULL,

    document_number VARCHAR(150),

    storage_path VARCHAR(500) NOT NULL,

    original_file_name VARCHAR(250),

    mime_type VARCHAR(100),

    verification_status VARCHAR(50)
        NOT NULL DEFAULT 'PENDING',

    verified_at TIMESTAMPTZ,

    rejection_reason VARCHAR(1000),

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_identity_document_profile
        FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS
    idx_identity_documents_profile_id
ON identity_documents(profile_id);


CREATE INDEX IF NOT EXISTS
    idx_identity_documents_status
ON identity_documents(verification_status);


-- ============================================================
-- 12. PROFILE SEARCH INDEXES
--
-- These indexes support the future Regular/Advanced Search.
-- We can add more indexes later when the search implementation
-- is finalized.
-- ============================================================

CREATE INDEX IF NOT EXISTS
    idx_profiles_religion
ON profiles(religion);

CREATE INDEX IF NOT EXISTS
    idx_profiles_caste
ON profiles(caste);

CREATE INDEX IF NOT EXISTS
    idx_profiles_sub_caste
ON profiles(sub_caste);

CREATE INDEX IF NOT EXISTS
    idx_profiles_mother_tongue
ON profiles(mother_tongue);

CREATE INDEX IF NOT EXISTS
    idx_profiles_gotra
ON profiles(gotra);

CREATE INDEX IF NOT EXISTS
    idx_profiles_zodiac_sign
ON profiles(zodiac_sign);

CREATE INDEX IF NOT EXISTS
    idx_profiles_nakshatra
ON profiles(nakshatra);

CREATE INDEX IF NOT EXISTS
    idx_profiles_manglik_status
ON profiles(manglik_status);


-- ============================================================
-- END OF V6
-- ============================================================
