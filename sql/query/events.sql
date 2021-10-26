-- name: ListEvents :many
SELECT
    id
    , title
    , image_url
    , created_at
    , updated_at
    , registration_url
    , scheduled_start
    , scheduled_end
    , youtube_id
    , registration_fee
    , description
FROM events;

-- name: GetEvent :one
SELECT
    id
    , title
    , image_url
    , created_at
    , updated_at
    , registration_url
    , scheduled_start
    , scheduled_end
    , youtube_id
    , registration_fee
    , description
FROM events
WHERE id = $1;

-- name: CreateEvent :one
INSERT INTO events (
    title
    , image_url
    , registration_url
    , scheduled_start
    , scheduled_end
    , youtube_id
    , registration_fee
    , description
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;

-- name: UpdateEvent :one
UPDATE events SET
    title = $2
    , image_url = $3
    , updated_at = CURRENT_TIMESTAMP
    , registration_url = $4
    , scheduled_start = $5
    , scheduled_end = $6
    , youtube_id = $7
    , registration_fee = $8
    , description = $9
WHERE id = $1
RETURNING id;

-- name: DeleteEvent :exec
DELETE FROM events WHERE id = $1;