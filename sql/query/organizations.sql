-- name: ListOrganizations :many
SELECT
    id
    , name
    , image_url
    , created_at
    , updated_at
FROM organizations;

-- name: GetOrganization :one
SELECT
    id
    , name
    , image_url
    , created_at
    , updated_at
FROM organizations
WHERE id = $1;

-- name: CreateOrganization :one
INSERT INTO organizations (name, image_url) VALUES ($1, $2) RETURNING id;

-- name: DeleteOrganization :exec
DELETE FROM organizations WHERE id = $1;