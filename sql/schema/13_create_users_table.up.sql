CREATE TABLE IF NOT EXISTS users (
    uid TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    residence TEXT NOT NULL,
    job_profession TEXT NOT NULL,
    school_name TEXT NOT NULL,
    school_major TEXT NOT NULL,
    school_semester INT NOT NULL,
    find_job_profession TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    telegram_number TEXT NOT NULL,
    motivation TEXT NOT NULL,
    information_source TEXT[] NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
