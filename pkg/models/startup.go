package models

// Startup model.
type Startup struct {
	CreatedUpdated

	ID       int64  `json:"id" db:"id"`
	Name     string `json:"name" db:"name" valid:"required"`
	ImageURL string `json:"image_url" db:"image_url" valid:"url,required"`
}
