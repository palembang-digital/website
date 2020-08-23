package api

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"github.com/palembang-digital/website/pkg/models"
)

// List events
// @Summary List events
// @Description Get the list of events
// @Tags events
// @ID list-events
// @Produce json
// @Success 200 {array} models.Event
// @Router /events [get]
func (api *API) listEvents(c echo.Context) error {
	ctx := c.Request().Context()

	events, err := api.eventsService.ListEvents(ctx)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, events)
}

// Get an event
// @Summary Get an event
// @Description Get an event by id
// @Tags events
// @ID get-event
// @Produce json
// @Param id path int true "Event ID"
// @Success 200 {object} models.Event
// @Router /events/{id} [get]
func (api *API) getEvent(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	event, err := api.eventsService.GetEvent(ctx, id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, event)
}

// Create a new event
// @Summary Create a new event
// @Description Create a new event
// @Tags events
// @ID create-event
// @Produce json
// @Param event body models.Event true "Create event"
// @Success 201 {object} models.Event
// @Router /events [post]
func (api *API) createEvent(c echo.Context) error {
	ctx := c.Request().Context()

	event := new(models.Event)
	if err := c.Bind(event); err != nil {
		return err
	}

	if err := c.Validate(event); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	newEvent, err := api.eventsService.CreateEvent(ctx, *event)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, newEvent)
}

// Delete an event
// @Summary Delete an event
// @Description Delete an event by id
// @Tags events
// @ID delete-event
// @Produce plain
// @Param id path int true "Event ID"
// @Success 204 {string} string ""
// @Router /events/{id} [delete]
func (api *API) deleteEvent(c echo.Context) error {
	ctx := c.Request().Context()

	idString := c.Param("id")
	id, _ := strconv.ParseInt(idString, 10, 64)

	if err := api.eventsService.DeleteEvent(ctx, id); err != nil {
		return err
	}

	return c.String(http.StatusNoContent, "")
}
