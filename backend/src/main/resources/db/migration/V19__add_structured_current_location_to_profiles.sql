ALTER TABLE profiles
    ADD COLUMN current_state VARCHAR(100),
    ADD COLUMN current_district VARCHAR(100),
    ADD COLUMN current_taluka VARCHAR(100),
    ADD COLUMN current_city VARCHAR(100);