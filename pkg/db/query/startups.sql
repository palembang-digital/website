-- name: ListStartups :many
SELECT
    id
    , name
    , image_url
    , slug
    , one_liner
    , description
    , website
    , created_at
    , updated_at
FROM startups;

-- name: GetStartupByID :one
SELECT
    id
    , name
    , image_url
    , slug
    , one_liner
    , description
    , website
    , created_at
    , updated_at
FROM startups
WHERE id = $1;

-- name: GetStartupBySlug :one
SELECT
    id
    , name
    , image_url
    , slug
    , one_liner
    , description
    , website
    , created_at
    , updated_at
FROM startups
WHERE slug = $1;

-- name: CreateStartup :one
INSERT INTO startups (
    name
    , image_url
    , slug
    , one_liner
    , description
    , website
)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id;

-- name: DeleteStartup :exec
DELETE FROM startups WHERE id = $1;