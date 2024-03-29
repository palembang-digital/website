package api

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/palembang-digital/website/pkg/db"
	"github.com/palembang-digital/website/pkg/services"
)

// API can register a set of endpoints in a router and handle
// them using the provided storage.
type API struct {
	bannersService       services.BannersService
	eventsService        services.EventsService
	organizationsService services.OrganizationsService
	startupsService      services.StartupsService

	adminUsername string
	adminPassword string
}

// NewAPI returns an initialized API type.
func NewAPI(
	bannersService services.BannersService,
	eventsService services.EventsService,
	organizationsService services.OrganizationsService,
	startupsService services.StartupsService,
	adminUsername, adminPassword string,
) *API {
	return &API{
		bannersService:       bannersService,
		eventsService:        eventsService,
		organizationsService: organizationsService,
		startupsService:      startupsService,

		adminUsername: adminUsername,
		adminPassword: adminPassword,
	}
}

// Register the API's endpoints in the given router.
func (api *API) Register(g *echo.Group) {
	// Banners API
	g.GET("/banners", api.listBanners)
	g.GET("/banners/:id", api.getBanner)
	g.POST("/banners", api.createBanner, middleware.BasicAuth(api.adminValidator))
	g.DELETE("/banners/:id", api.deleteBanner, middleware.BasicAuth(api.adminValidator))

	// Events API
	g.GET("/events", api.listEvents)
	g.GET("/events/:id", api.getEvent)
	g.POST("/events", api.createEvent, middleware.BasicAuth(api.adminValidator))
	g.PUT("/events/:id", api.updateEvent, middleware.BasicAuth(api.adminValidator))
	g.DELETE("/events/:id", api.deleteEvent, middleware.BasicAuth(api.adminValidator))

	// Organizations API
	g.GET("/organizations", api.listOrganizations)
	g.GET("/organizations/:id", api.getOrganization)
	g.POST("/organizations", api.createOrganization, middleware.BasicAuth(api.adminValidator))
	g.DELETE("/organizations/:id", api.deleteOrganization, middleware.BasicAuth(api.adminValidator))

	// Startups API
	g.GET("/startups", api.listStartups)
	g.GET("/startups/:slug", api.getStartupBySlug)
	g.POST("/startups", api.createStartup, middleware.BasicAuth(api.adminValidator))
	g.DELETE("/startups/:id", api.deleteStartup, middleware.BasicAuth(api.adminValidator))
}

func (api *API) adminValidator(username, password string, c echo.Context) (bool, error) {
	if username == api.adminUsername && password == api.adminPassword {
		return true, nil
	}
	return false, nil
}

func (api *API) eventValidator(event *db.Event) error {
	return validation.ValidateStruct(event,
		validation.Field(&event.ImageUrl, is.URL),
		validation.Field(&event.RegistrationUrl, is.URL),
	)
}

func (api *API) organizationValidator(organization *db.Organization) error {
	return validation.ValidateStruct(organization,
		validation.Field(&organization.ImageUrl, is.URL),
	)
}

func (api *API) startupValidator(startup *db.Startup) error {
	return validation.ValidateStruct(startup,
		validation.Field(&startup.ImageUrl, is.URL),
	)
}

func (api *API) bannerValidator(banner *db.Banner) error {
	return validation.ValidateStruct(banner,
		validation.Field(&banner.Text, validation.Required),
	)
}
