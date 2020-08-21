package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// List events
// @Summary List events
// @Description Get the list of events
// @Tags events
// @ID list-events
// @Produce json
// @Success 200 {array} model.Event
// @Router /events [get]
func (api *API) listEvents(c echo.Context) error {
	return c.String(http.StatusOK, "list events")
}

// Get an event
// @Summary Get an event
// @Description Get an event by id
// @Tags events
// @ID get-event
// @Produce json
// @Param id path int true "Event ID"
// @Success 200 {object} model.Event
// @Router /events/{id} [get]
func (api *API) getEvent(c echo.Context) error {
	return c.String(http.StatusOK, "get event")
}

// Create a new event
// @Summary Create a new event
// @Description Create a new event
// @Tags events
// @ID create-event
// @Produce json
// @Param event body model.Event true "Create event"
// @Success 200 {object} model.Event
// @Router /events [post]
func (api *API) createEvent(c echo.Context) error {
	return c.String(http.StatusOK, "create event")
}
