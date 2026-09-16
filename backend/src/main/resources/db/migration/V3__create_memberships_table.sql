CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    plan_code VARCHAR(50) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,

    amount_inr NUMERIC(10, 2) NOT NULL,

    membership_status VARCHAR(30) NOT NULL DEFAULT 'PENDING_PAYMENT',

    started_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_memberships_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_memberships_user_id
    ON memberships(user_id);

CREATE INDEX idx_memberships_status
    ON memberships(membership_status);

CREATE INDEX idx_memberships_plan_code
    ON memberships(plan_code);