package api

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/palembang-digital/website/pkg/services"
)

// API can register a set of endpoints in a router and handle
// them using the provided storage.
type API struct {
	eventsService services.EventsService

	adminUsername string
	adminPassword string
}

// NewAPI returns an initialized API type.
func NewAPI(eventsService services.EventsService, adminUsername, adminPassword string) *API {
	return &API{
		eventsService: eventsService,

		adminUsername: adminUsername,
		adminPassword: adminPassword,
	}
}

// Register the API's endpoints in the given router.
func (api *API) Register(g *echo.Group) {
	// Events API
	g.GET("/events", api.listEvents)
	g.GET("/events/:id", api.getEvent)
	g.POST("/events", api.createEvent, middleware.BasicAuth(api.adminValidator))
	g.DELETE("/events/:id", api.deleteEvent, middleware.BasicAuth(api.adminValidator))
	g.PUT("/events/:id", api.updateEvent, middleware.BasicAuth(api.adminValidator))
}

func (api *API) adminValidator(username, password string, c echo.Context) (bool, error) {
	if username == api.adminUsername && password == api.adminPassword {
		return true, nil
	}
	return false, nil
}
