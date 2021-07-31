package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"github.com/palembang-digital/website/pkg/models"
)

// List banners
// @Summary List banners
// @Description Get the list of banners
// @Tags banners
// @ID list-banners
// @Produce json
// @Success 200 {array} models.Banner
// @Router /banners [get]
func (api *API) listBanners(c echo.Context) error {
	ctx := c.Request().Context()

	banners, err := api.bannersService.ListBanners(ctx)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, banners)
}

// Get an banner
// @Summary Get an banner
// @Description Get an banner by id
// @Tags banners
// @ID get-banner
// @Produce json
// @Param id path int true "Banner ID"
// @Success 200 {object} models.Banner
// @Router /banners/{id} [get]
func (api *API) getBanner(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	banner, err := api.bannersService.GetBanner(ctx, id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, banner)
}

// Create a new banner
// @Summary Create a new banner
// @Description Create a new banner
// @Tags banners
// @ID create-banner
// @Produce json
// @Param banner body models.Banner true "Create banner"
// @Success 201 {object} models.Banner
// @Router /banners [post]
func (api *API) createBanner(c echo.Context) error {
	ctx := c.Request().Context()

	banner := new(models.Banner)
	if err := c.Bind(banner); err != nil {
		return err
	}

	if err := c.Validate(banner); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newBanner, err := api.bannersService.CreateBanner(ctx, *banner)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newBanner)
}

// Delete an banner
// @Summary Delete an banner
// @Description Delete an banner by id
// @Tags banners
// @ID delete-banner
// @Produce plain
// @Param id path int true "Banner ID"
// @Success 204 {string} string ""
// @Router /banners/{id} [delete]
func (api *API) deleteBanner(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	if err := api.bannersService.DeleteBanner(ctx, id); err != nil {
		return err
	}

	return c.String(http.StatusNoContent, "")
}
