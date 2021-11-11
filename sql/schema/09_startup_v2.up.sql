ALTER TABLE IF EXISTS startups ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE IF EXISTS startups ADD COLUMN IF NOT EXISTS one_liner TEXT;
ALTER TABLE IF EXISTS startups ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE IF EXISTS startups ADD COLUMN IF NOT EXISTS website TEXT;

CREATE UNIQUE INDEX uidx_startups_slug ON startups(slug);