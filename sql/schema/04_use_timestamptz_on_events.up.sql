ALTER TABLE events ALTER created_at
    TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'Asia/Jakarta';

ALTER TABLE events ALTER updated_at
    TYPE TIMESTAMPTZ USING updated_at AT TIME ZONE 'Asia/Jakarta';

ALTER TABLE events ALTER scheduled_start
    TYPE TIMESTAMPTZ USING scheduled_start AT TIME ZONE 'Asia/Jakarta';

ALTER TABLE events ALTER scheduled_end
    TYPE TIMESTAMPTZ USING scheduled_end AT TIME ZONE 'Asia/Jakarta';
