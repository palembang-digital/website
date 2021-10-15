package models

// Startup model.
type Startup struct {
	CreatedUpdated

	ID          int64  `json:"id" db:"id"`
	Name        string `json:"name" db:"name" valid:"required"`
	ImageURL    string `json:"image_url" db:"image_url" valid:"url,required"`
	Slug        string `json:"slug" db:"slug" valid:"required"`
	OneLiner    string `json:"one_liner" db:"one_liner"`
	Description string `json:"description" db:"description"`
	Website     string `json:"website" db:"website"`
}
