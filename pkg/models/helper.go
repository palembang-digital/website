package models

import (
	"time"
)

// CreatedUpdated stores created and updated time of the model.
type CreatedUpdated struct {
	CreatedAt *time.Time `json:"created_at,omitempty" example:"2020-04-21T00:00:00Z"`
	UpdatedAt *time.Time `json:"updated_at,omitempty" example:"2020-04-21T00:00:00Z"`
}
