ALTER TABLE events ADD COLUMN scheduled_start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE events ADD COLUMN scheduled_end TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
