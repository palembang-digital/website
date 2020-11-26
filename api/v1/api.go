package api

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/palembang-digital/website/pkg/services"
)

// API can register a set of endpoints in a router and handle
// them using the provided storage.
type API struct {
	eventsService        services.EventsService
	organizationsService services.OrganizationsService

	adminUsername string
	adminPassword string
}

// NewAPI returns an initialized API type.
func NewAPI(eventsService services.EventsService,
	organizationsService services.OrganizationsService,
	adminUsername, adminPassword string) *API {
	return &API{
		eventsService:        eventsService,
		organizationsService: organizationsService,

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

	// Organizations API
	g.GET("/organizations", api.listOrganizations)
	g.GET("/organizations/:id", api.getOrganization)
	g.POST("/organizations", api.createOrganization, middleware.BasicAuth(api.adminValidator))
	g.DELETE("/organizations/:id", api.deleteOrganization, middleware.BasicAuth(api.adminValidator))
}

func (api *API) adminValidator(username, password string, c echo.Context) (bool, error) {
	if username == api.adminUsername && password == api.adminPassword {
		return true, nil
	}
	return false, nil
}
