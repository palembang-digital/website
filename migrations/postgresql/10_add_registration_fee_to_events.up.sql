ALTER TABLE IF EXISTS events ADD COLUMN IF NOT EXISTS registration_fee INT;
UPDATE events SET registration_fee = 0;
