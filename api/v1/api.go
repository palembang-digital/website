package api

import "github.com/labstack/echo/v4"

// API can register a set of endpoints in a router and handle
// them using the provided storage.
type API struct{}

// NewAPI returns an initialized API type.
func NewAPI() *API {
	return &API{}
}

// Register the API's endpoints in the given router.
func (api *API) Register(g *echo.Group) {
	// Events API
	g.GET("/events", api.listEvents)
	g.GET("/events/:id", api.getEvent)
	g.POST("/events", api.createEvent)
}
