package models

import "time"

// Event model.
type Event struct {
	CreatedUpdated

	ID              int64  `json:"id" db:"id"`
	Title           string `json:"title" db:"title" valid:"required"`
	ImageURL        string `json:"image_url" db:"image_url" valid:"url,required"`
	RegistrationURL string `json:"registration_url" db:"registration_url" valid:"url"`
	YoutubeID       string `json:"youtube_id" db:"youtube_id"`
	RegistrationFee int    `json:"registration_fee" db:"registration_fee"`

	ScheduledStart *time.Time `json:"scheduled_start,omitempty" db:"scheduled_start" example:"2020-04-21T00:00:00Z" valid:"required"`
	ScheduledEnd   *time.Time `json:"scheduled_end,omitempty" db:"scheduled_end" example:"2020-04-21T00:00:00Z" valid:"required"`
}
