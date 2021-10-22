package models

// Banner model.
type Banner struct {
	CreatedUpdated

	ID   int64  `json:"id"`
	Text string `json:"text" valid:"required"`
}
