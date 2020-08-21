package api

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestAPI_listEvents(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/events", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	api := NewAPI()
	if assert.NoError(t, api.listEvents(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "list events", rec.Body.String())
	}
}

func TestAPI_getEvent(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/events/1", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	api := NewAPI()
	if assert.NoError(t, api.getEvent(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "get event", rec.Body.String())
	}
}

func TestAPI_createEvent(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/events", strings.NewReader(""))
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	api := NewAPI()
	if assert.NoError(t, api.createEvent(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, "create event", rec.Body.String())
	}
}
