-- name: ListBanners :many
SELECT
    id
    , text
    , created_at
    , updated_at
FROM banners;

-- name: GetBanner :one
SELECT
    id
    , text
    , created_at
    , updated_at
FROM banners
WHERE id = $1;

-- name: CreateBanner :one
INSERT INTO banners (text) VALUES ($1) RETURNING id;

-- name: DeleteBanner :exec
DELETE FROM banners WHERE id = $1;