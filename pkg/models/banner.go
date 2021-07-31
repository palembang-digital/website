package models

// Banner model.
type Banner struct {
	CreatedUpdated

	ID       int64  `json:"id" db:"id"`
	Text     string `json:"text" db:"text" valid:"required"`
	IsActive bool   `json:"is_active" db:"is_active" valid:"required"`
	Priority int64  `json:"priority" db:"priority" valid:"required"`
}
