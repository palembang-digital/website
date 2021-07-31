package models

// Banner model.
type Banner struct {
	CreatedUpdated

	ID   int64  `json:"id" db:"id"`
	Text string `json:"text" db:"text" valid:"required"`
}
