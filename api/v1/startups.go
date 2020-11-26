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

// Get an event
// @Summary Get an event
// @Description Get an event by id
// @Tags startups
// @ID get-event
// @Produce json
// @Param id path int true "Startup ID"
// @Success 200 {object} models.Startup
// @Router /startups/{id} [get]
func (api *API) getStartup(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	event, err := api.startupsService.GetStartup(ctx, id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, event)
}

// Create a new event
// @Summary Create a new event
// @Description Create a new event
// @Tags startups
// @ID create-event
// @Produce json
// @Param event body models.Startup true "Create event"
// @Success 201 {object} models.Startup
// @Router /startups [post]
func (api *API) createStartup(c echo.Context) error {
	ctx := c.Request().Context()

	event := new(models.Startup)
	if err := c.Bind(event); err != nil {
		return err
	}

	if err := c.Validate(event); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newStartup, err := api.startupsService.CreateStartup(ctx, *event)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newStartup)
}

// Delete an event
// @Summary Delete an event
// @Description Delete an event by id
// @Tags startups
// @ID delete-event
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
