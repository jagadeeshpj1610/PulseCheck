CREATE TABLE
    IF NOT EXISTS monitors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        url VARCHAR(2048) NOT NULL,
        method VARCHAR(10) NOT NULL DEFAULT 'GET',
        interval_seconds INTEGER NOT NULL DEFAULT 300,
        timeout_seconds INTEGER NOT NULL DEFAULT 10,
        expected_status_code INTEGER NOT NULL DEFAULT 200,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        last_checked_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now ()
    );