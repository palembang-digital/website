package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/palembang-digital/website/pkg/db"
)

// List organizations
// @Summary List organizations
// @Description Get the list of organizations
// @Tags organizations
// @ID list-organizations
// @Produce json
// @Success 200 {array} db.Organization
// @Router /organizations [get]
func (api *API) listOrganizations(c echo.Context) error {
	ctx := c.Request().Context()

	organizations, err := api.organizationsService.ListOrganizations(ctx)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, organizations)
}

// Get an organization
// @Summary Get an organization
// @Description Get an organization by id
// @Tags organizations
// @ID get-organization
// @Produce json
// @Param id path int true "Organization ID"
// @Success 200 {object} db.Organization
// @Router /organizations/{id} [get]
func (api *API) getOrganization(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	organization, err := api.organizationsService.GetOrganization(ctx, id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, organization)
}

// Create a new organization
// @Summary Create a new organization
// @Description Create a new organization
// @Tags organizations
// @ID create-organization
// @Produce json
// @Param organization body db.Organization true "Create organization"
// @Success 201 {object} db.Organization
// @Router /organizations [post]
func (api *API) createOrganization(c echo.Context) error {
	ctx := c.Request().Context()

	organization := new(db.Organization)
	if err := c.Bind(organization); err != nil {
		return err
	}

	if err := c.Validate(organization); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newOrganization, err := api.organizationsService.CreateOrganization(ctx, *organization)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newOrganization)
}

// Delete an organization
// @Summary Delete an organization
// @Description Delete an organization by id
// @Tags organizations
// @ID delete-organization
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
