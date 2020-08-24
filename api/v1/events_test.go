package api

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/palembang-digital/website/pkg/models"
	"github.com/palembang-digital/website/pkg/services/mocks"
)

func TestAPI_listEvents(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/events", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	mockEventsService := &mocks.EventsService{}
	mockEventsService.On("ListEvents", mock.Anything).Return([]models.Event{}, nil)

	api := NewAPI(mockEventsService, "", "")
	if assert.NoError(t, api.listEvents(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "[]\n", rec.Body.String())
	}
}
