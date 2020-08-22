package models

// Event model.
type Event struct {
	CreatedUpdated

	ID       int64  `json:"id" db:"id"`
	Title    string `json:"title" db:"title"`
	ImageURL string `json:"image_url" db:"image_url"`
}
