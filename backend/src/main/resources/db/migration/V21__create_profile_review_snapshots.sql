CREATE TABLE profile_review_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL UNIQUE
        REFERENCES profiles(id) ON DELETE CASCADE,

    baseline_json TEXT,
    proposed_json TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profile_review_snapshots_profile_id
    ON profile_review_snapshots(profile_id);
