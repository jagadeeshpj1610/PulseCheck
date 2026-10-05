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

CONSTRAINT monitors_method_check CHECK (
    method IN ('GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD')
),
CONSTRAINT monitors_interval_check CHECK (interval_seconds >= 60),
CONSTRAINT monitors_timeout_check CHECK (timeout_seconds BETWEEN 1 AND 60),
CONSTRAINT monitors_status_code_check CHECK (expected_status_code BETWEEN 100 AND 599),
CONSTRAINT monitors_name_not_blank CHECK (char_length(trim(name)) > 0) CREATE INDEX IF NOT EXISTS monitors_user_id_idx ON monitors (user_id);

CREATE INDEX IF NOT EXISTS monitors_user_id_idx ON monitors (user_id);

CREATE INDEX IF NOT EXISTS monitors_active_idx ON monitors (last_checked_at)
WHERE is_active = TRUE;