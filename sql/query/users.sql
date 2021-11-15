-- name: GetUser :one
SELECT
    uid
    , email
    , name
    , residence
    , job_profession
    , school_name
    , school_major
    , school_semester
    , find_job_profession
    , whatsapp_number
    , telegram_number
    , motivation
    , information_source
    , created_at
    , updated_at
FROM users
WHERE uid = $1;

-- name: CreateUser :one
INSERT INTO users (
    uid
    , email
    , name
    , residence
    , job_profession
    , school_name
    , school_major
    , school_semester
    , find_job_profession
    , whatsapp_number
    , telegram_number
    , motivation
    , information_source
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING uid;

-- name: DeleteUser :exec
DELETE FROM users WHERE uid = $1;