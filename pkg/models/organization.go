package models

// Organization model.
type Organization struct {
	CreatedUpdated

	ID       int64  `json:"id"`
	Name     string `json:"name" valid:"required"`
	ImageURL string `json:"image_url" valid:"url,required"`
}
