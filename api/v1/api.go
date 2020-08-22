package api

import (
	"github.com/labstack/echo/v4"

	"github.com/palembang-digital/website/pkg/services"
)

// API can register a set of endpoints in a router and handle
// them using the provided storage.
type API struct {
	eventsService services.EventsService
}

// NewAPI returns an initialized API type.
func NewAPI(eventsService services.EventsService) *API {
	return &API{
		eventsService: eventsService,
	}
}

// Register the API's endpoints in the given router.
func (api *API) Register(g *echo.Group) {
	// Events API
	g.GET("/events", api.listEvents)
	g.GET("/events/:id", api.getEvent)
	g.POST("/events", api.createEvent)
}
