// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"database/sql"
	"time"
)

type Banner struct {
	ID        int64
	Text      string
	CreatedAt time.Time
	UpdatedAt sql.NullTime
}

type Event struct {
	ID              int64
	Title           string
	ImageUrl        sql.NullString
	CreatedAt       time.Time
	UpdatedAt       sql.NullTime
	RegistrationUrl sql.NullString
	ScheduledStart  time.Time
	ScheduledEnd    time.Time
	YoutubeID       sql.NullString
	RegistrationFee sql.NullInt32
	Description     sql.NullString
}

type Organization struct {
	ID        int64
	Name      string
	ImageUrl  sql.NullString
	CreatedAt time.Time
	UpdatedAt sql.NullTime
}

type Startup struct {
	ID          int64
	Name        string
	ImageUrl    sql.NullString
	CreatedAt   time.Time
	UpdatedAt   sql.NullTime
	Slug        sql.NullString
	OneLiner    sql.NullString
	Description sql.NullString
	Website     sql.NullString
}