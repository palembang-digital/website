-- name: ListEvents :many
SELECT
    id
    , title
    , description
    , image_url
    , registration_url
    , youtube_id
    , registration_fee
    , scheduled_start
    , scheduled_end
    , created_at
    , updated_at
FROM events;

-- name: GetEvent :one
SELECT
    id
    , title
    , description
    , image_url
    , registration_url
    , youtube_id
    , registration_fee
    , scheduled_start
    , scheduled_end
    , created_at
    , updated_at
FROM events
WHERE id = $1;

-- name: CreateEvent :one
INSERT INTO events (
    title
    , description
    , image_url
    , registration_url
    , youtube_id
    , registration_fee
    , scheduled_start
    , scheduled_end
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;

-- name: UpdateEvent :one
UPDATE events SET
    title = $1
    , image_url = $2
    , registration_url = $3
    , youtube_id = $4
    , registration_fee = $5
    , scheduled_start = $6
    , scheduled_end = $7
    , updated_at = CURRENT_TIMESTAMP
    , description = $8
WHERE id = $9
RETURNING id;

-- name: DeleteEvent :exec
DELETE FROM events WHERE id = $1;