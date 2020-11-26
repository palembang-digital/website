package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"github.com/palembang-digital/website/pkg/models"
)

// List organizations
// @Summary List organizations
// @Description Get the list of organizations
// @Tags organizations
// @ID list-organizations
// @Produce json
// @Success 200 {array} models.Organization
// @Router /organizations [get]
func (api *API) listOrganizations(c echo.Context) error {
	ctx := c.Request().Context()

	organizations, err := api.organizationsService.ListOrganizations(ctx)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, organizations)
}

// Get an event
// @Summary Get an event
// @Description Get an event by id
// @Tags organizations
// @ID get-event
// @Produce json
// @Param id path int true "Organization ID"
// @Success 200 {object} models.Organization
// @Router /organizations/{id} [get]
func (api *API) getOrganization(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	event, err := api.organizationsService.GetOrganization(ctx, id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, event)
}

// Create a new event
// @Summary Create a new event
// @Description Create a new event
// @Tags organizations
// @ID create-event
// @Produce json
// @Param event body models.Organization true "Create event"
// @Success 201 {object} models.Organization
// @Router /organizations [post]
func (api *API) createOrganization(c echo.Context) error {
	ctx := c.Request().Context()

	event := new(models.Organization)
	if err := c.Bind(event); err != nil {
		return err
	}

	if err := c.Validate(event); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newOrganization, err := api.organizationsService.CreateOrganization(ctx, *event)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newOrganization)
}

// Delete an event
// @Summary Delete an event
// @Description Delete an event by id
// @Tags organizations
// @ID delete-event
// @Produce plain
// @Param id path int true "Organization ID"
// @Success 204 {string} string ""
// @Router /organizations/{id} [delete]
func (api *API) deleteOrganization(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	if err := api.organizationsService.DeleteOrganization(ctx, id); err != nil {
		return err
	}

	return c.String(http.StatusNoContent, "")
}
