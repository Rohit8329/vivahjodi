CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    membership_id UUID NOT NULL,

    payment_gateway VARCHAR(50) NOT NULL,

    gateway_order_id VARCHAR(255),

    gateway_payment_id VARCHAR(255),

    amount_inr NUMERIC(10, 2) NOT NULL,

    currency VARCHAR(10) NOT NULL DEFAULT 'INR',

    payment_status VARCHAR(30) NOT NULL DEFAULT 'CREATED',

    paid_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_payments_membership
        FOREIGN KEY (membership_id)
        REFERENCES memberships(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_payments_user_id
    ON payments(user_id);

CREATE INDEX idx_payments_membership_id
    ON payments(membership_id);

CREATE INDEX idx_payments_status
    ON payments(payment_status);

CREATE INDEX idx_payments_gateway_order_id
    ON payments(gateway_order_id);

CREATE INDEX idx_payments_gateway_payment_id
    ON payments(gateway_payment_id);