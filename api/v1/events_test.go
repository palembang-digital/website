package api

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/palembang-digital/website/pkg/models"
	"github.com/palembang-digital/website/pkg/services/mocks"
)

type mockRequestValidator struct{}

func (m *mockRequestValidator) Validate(i interface{}) error {
	return nil
}

func TestAPI_listEvents(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/events", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	mockEventsService := &mocks.EventsService{}
	mockEventsService.On("ListEvents", mock.Anything).Return([]models.Event{}, nil)

	api := &API{eventsService: mockEventsService}
	if assert.NoError(t, api.listEvents(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "[]\n", rec.Body.String())
	}
}

func TestAPI_getEvent(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/events/1", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)
	c.SetPath("/events/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	mockEventsService := &mocks.EventsService{}
	mockEventsService.On("GetEvent", mock.Anything, int64(1)).Return(models.Event{}, nil)

	api := &API{eventsService: mockEventsService}
	if assert.NoError(t, api.getEvent(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "{\"id\":0,\"title\":\"\",\"image_url\":\"\",\"registration_url\":\"\",\"youtube_id\":\"\"}\n", rec.Body.String())
	}
}

func TestAPI_createEvent(t *testing.T) {
	event := models.Event{
		ID:              1,
		Title:           "event-1",
		ImageURL:        "https://patal.com/event-1.png",
		RegistrationURL: "https://patal.com/event-1",
		YoutubeID:       "dQw4w9WgXcQ",
	}
	eventJSON, _ := json.Marshal(event)

	req := httptest.NewRequest(http.MethodPost, "/events", bytes.NewReader(eventJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()

	e := echo.New()
	e.Validator = &mockRequestValidator{}
	c := e.NewContext(req, rec)

	mockEventsService := &mocks.EventsService{}
	mockEventsService.On("CreateEvent", mock.Anything, event).Return(event, nil)

	api := &API{eventsService: mockEventsService}
	if assert.NoError(t, api.createEvent(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		assert.Equal(t, "{\"id\":1,\"title\":\"event-1\",\"image_url\":\"https://patal.com/event-1.png\",\"registration_url\":\"https://patal.com/event-1\",\"youtube_id\":\"dQw4w9WgXcQ\"}\n", rec.Body.String())
	}
}

func TestAPI_deleteEvent(t *testing.T) {
	req := httptest.NewRequest(http.MethodDelete, "/events/1", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)
	c.SetPath("/events/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	mockEventsService := &mocks.EventsService{}
	mockEventsService.On("DeleteEvent", mock.Anything, int64(1)).Return(nil)

	api := &API{eventsService: mockEventsService}
	if assert.NoError(t, api.deleteEvent(c)) {
		assert.Equal(t, http.StatusNoContent, rec.Code)
		assert.Equal(t, "", rec.Body.String())
	}
}
