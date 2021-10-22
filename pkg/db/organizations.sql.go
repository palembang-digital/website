// Code generated by sqlc. DO NOT EDIT.
// source: organizations.sql

package db

import (
	"context"
	"database/sql"
)

const createOrganization = `-- name: CreateOrganization :one
INSERT INTO organizations (name, image_url) VALUES ($1, $2) RETURNING id
`

type CreateOrganizationParams struct {
	Name     string
	ImageUrl sql.NullString
}

func (q *Queries) CreateOrganization(ctx context.Context, arg CreateOrganizationParams) (int64, error) {
	row := q.db.QueryRow(ctx, createOrganization, arg.Name, arg.ImageUrl)
	var id int64
	err := row.Scan(&id)
	return id, err
}

const deleteOrganization = `-- name: DeleteOrganization :exec
DELETE FROM organizations WHERE id = $1
`

func (q *Queries) DeleteOrganization(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteOrganization, id)
	return err
}

const getOrganization = `-- name: GetOrganization :one
SELECT
    id
    , name
    , image_url
    , created_at
    , updated_at
FROM organizations
WHERE id = $1
`

func (q *Queries) GetOrganization(ctx context.Context, id int64) (Organization, error) {
	row := q.db.QueryRow(ctx, getOrganization, id)
	var i Organization
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.ImageUrl,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const listOrganizations = `-- name: ListOrganizations :many
SELECT
    id
    , name
    , image_url
    , created_at
    , updated_at
FROM organizations
`

func (q *Queries) ListOrganizations(ctx context.Context) ([]Organization, error) {
	rows, err := q.db.Query(ctx, listOrganizations)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Organization{}
	for rows.Next() {
		var i Organization
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.ImageUrl,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}