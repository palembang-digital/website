package api

import (
	"testing"

	"github.com/labstack/echo/v4"
)

func TestAPI_Register(t *testing.T) {
	e := echo.New()

	api := NewAPI()
	api.Register(e.Group("api/v1"))
}
