package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"github.com/palembang-digital/website/pkg/models"
)

// List startups
// @Summary List startups
// @Description Get the list of startups
// @Tags startups
// @ID list-startups
// @Produce json
// @Success 200 {array} models.Startup
// @Router /startups [get]
func (api *API) listStartups(c echo.Context) error {
	ctx := c.Request().Context()

	startups, err := api.startupsService.ListStartups(ctx)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, startups)
}

// Get an startup by slug
// @Summary Get an startup by slug
// @Description Get an startup by slug
// @Tags startups
// @ID get-startup-by-slug
// @Produce json
// @Param slug path string true "Startup slug"
// @Success 200 {object} models.Startup
// @Router /startups/{slug} [get]
func (api *API) getStartupBySlug(c echo.Context) error {
	ctx := c.Request().Context()

	slug := c.Param("slug")

	startup, err := api.startupsService.GetStartupBySlug(ctx, slug)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, startup)
}

// Create a new startup
// @Summary Create a new startup
// @Description Create a new startup
// @Tags startups
// @ID create-startup
// @Produce json
// @Param startup body models.Startup true "Create startup"
// @Success 201 {object} models.Startup
// @Router /startups [post]
func (api *API) createStartup(c echo.Context) error {
	ctx := c.Request().Context()

	startup := new(models.Startup)
	if err := c.Bind(startup); err != nil {
		return err
	}

	if err := c.Validate(startup); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newStartup, err := api.startupsService.CreateStartup(ctx, *startup)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newStartup)
}

// Delete an startup
// @Summary Delete an startup
// @Description Delete an startup by id
// @Tags startups
// @ID delete-startup
// @Produce plain
// @Param id path int true "Startup ID"
// @Success 204 {string} string ""
// @Router /startups/{id} [delete]
func (api *API) deleteStartup(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	if err := api.startupsService.DeleteStartup(ctx, id); err != nil {
		return err
	}

	return c.String(http.StatusNoContent, "")
}
