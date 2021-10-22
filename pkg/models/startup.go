package models

// Startup model.
type Startup struct {
	CreatedUpdated

	ID          int64  `json:"id"`
	Name        string `json:"name" valid:"required"`
	ImageURL    string `json:"image_url" valid:"url,required"`
	Slug        string `json:"slug" valid:"required"`
	OneLiner    string `json:"one_liner"`
	Description string `json:"description"`
	Website     string `json:"website"`
}
