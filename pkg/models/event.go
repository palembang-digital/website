package models

// Event model.
type Event struct {
	CreatedUpdated

	ID              int64  `json:"id" db:"id"`
	Title           string `json:"title" db:"title" valid:"required"`
	ImageURL        string `json:"image_url" db:"image_url" valid:"url,required"`
	RegistrationURL string `json:"registration_url" db:"registration_url" valid:"url"`
}
