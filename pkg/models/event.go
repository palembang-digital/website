package models

import "time"

// Event model.
type Event struct {
	CreatedUpdated

	ID              int64  `json:"id"`
	Title           string `json:"title" valid:"required"`
	Description     string `json:"description"`
	ImageURL        string `json:"image_url" valid:"url,required"`
	RegistrationURL string `json:"registration_url" valid:"url"`
	YoutubeID       string `json:"youtube_id"`
	RegistrationFee int    `json:"registration_fee"`

	ScheduledStart *time.Time `json:"scheduled_start,omitempty" example:"2020-04-21T00:00:00Z" valid:"required"`
	ScheduledEnd   *time.Time `json:"scheduled_end,omitempty" example:"2020-04-21T00:00:00Z" valid:"required"`
}
