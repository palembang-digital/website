// Code generated by sqlc. DO NOT EDIT.
// source: events.sql

package db

import (
	"context"
	"time"
)

const createEvent = `-- name: CreateEvent :one
INSERT INTO events (
    title
    , image_url
    , registration_url
    , scheduled_start
    , scheduled_end
    , youtube_id
    , registration_fee
    , description
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
`

type CreateEventParams struct {
	Title           string    `db:"title" json:"title"`
	ImageUrl        string    `db:"image_url" json:"image_url"`
	RegistrationUrl string    `db:"registration_url" json:"registration_url"`
	ScheduledStart  time.Time `db:"scheduled_start" json:"scheduled_start"`
	ScheduledEnd    time.Time `db:"scheduled_end" json:"scheduled_end"`
	YoutubeID       string    `db:"youtube_id" json:"youtube_id"`
	RegistrationFee int64     `db:"registration_fee" json:"registration_fee"`
	Description     string    `db:"description" json:"description"`
}

func (q *Queries) CreateEvent(ctx context.Context, arg CreateEventParams) (int64, error) {
	row := q.db.QueryRow(ctx, createEvent,
		arg.Title,
		arg.ImageUrl,
		arg.RegistrationUrl,
		arg.ScheduledStart,
		arg.ScheduledEnd,
		arg.YoutubeID,
		arg.RegistrationFee,
		arg.Description,
	)
	var id int64
	err := row.Scan(&id)
	return id, err
}

const deleteEvent = `-- name: DeleteEvent :exec
DELETE FROM events WHERE id = $1
`

func (q *Queries) DeleteEvent(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteEvent, id)
	return err
}

const getEvent = `-- name: GetEvent :one
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
WHERE id = $1
`

func (q *Queries) GetEvent(ctx context.Context, id int64) (Event, error) {
	row := q.db.QueryRow(ctx, getEvent, id)
	var i Event
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.ImageUrl,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.RegistrationUrl,
		&i.ScheduledStart,
		&i.ScheduledEnd,
		&i.YoutubeID,
		&i.RegistrationFee,
		&i.Description,
	)
	return i, err
}

const listEvents = `-- name: ListEvents :many
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
`

func (q *Queries) ListEvents(ctx context.Context) ([]Event, error) {
	rows, err := q.db.Query(ctx, listEvents)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Event{}
	for rows.Next() {
		var i Event
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.ImageUrl,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.RegistrationUrl,
			&i.ScheduledStart,
			&i.ScheduledEnd,
			&i.YoutubeID,
			&i.RegistrationFee,
			&i.Description,
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

const updateEvent = `-- name: UpdateEvent :one
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
RETURNING id
`

type UpdateEventParams struct {
	ID              int64     `db:"id" json:"id"`
	Title           string    `db:"title" json:"title"`
	ImageUrl        string    `db:"image_url" json:"image_url"`
	RegistrationUrl string    `db:"registration_url" json:"registration_url"`
	ScheduledStart  time.Time `db:"scheduled_start" json:"scheduled_start"`
	ScheduledEnd    time.Time `db:"scheduled_end" json:"scheduled_end"`
	YoutubeID       string    `db:"youtube_id" json:"youtube_id"`
	RegistrationFee int64     `db:"registration_fee" json:"registration_fee"`
	Description     string    `db:"description" json:"description"`
}

func (q *Queries) UpdateEvent(ctx context.Context, arg UpdateEventParams) (int64, error) {
	row := q.db.QueryRow(ctx, updateEvent,
		arg.ID,
		arg.Title,
		arg.ImageUrl,
		arg.RegistrationUrl,
		arg.ScheduledStart,
		arg.ScheduledEnd,
		arg.YoutubeID,
		arg.RegistrationFee,
		arg.Description,
	)
	var id int64
	err := row.Scan(&id)
	return id, err
}
