package model

// Event model.
type Event struct {
	ID       int64  `json:"id"`
	Title    string `json:"title"`
	ImageURL string `json:"image_url"`
}
