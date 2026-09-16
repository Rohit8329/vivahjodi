CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,

    gender VARCHAR(20) NOT NULL,

    date_of_birth DATE NOT NULL,

    marital_status VARCHAR(30) NOT NULL DEFAULT 'NEVER_MARRIED',

    height_cm INTEGER,
    weight_kg INTEGER,

    religion VARCHAR(50),
    caste VARCHAR(100),
    sub_caste VARCHAR(100),

    mother_tongue VARCHAR(50),

    about_me TEXT,

    profile_status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_profiles_user_id
        UNIQUE (user_id),

    CONSTRAINT fk_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_profiles_gender
    ON profiles(gender);

CREATE INDEX idx_profiles_date_of_birth
    ON profiles(date_of_birth);

CREATE INDEX idx_profiles_religion
    ON profiles(religion);

CREATE INDEX idx_profiles_caste
    ON profiles(caste);

CREATE INDEX idx_profiles_profile_status
    ON profiles(profile_status);