ALTER TABLE profile_photos
    ADD COLUMN IF NOT EXISTS original_file_name VARCHAR(255);

ALTER TABLE profile_photos
    ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);