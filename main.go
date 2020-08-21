package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"

	"github.com/palembang-digital/website/api/v1"
	_ "github.com/palembang-digital/website/api/v1/docs"
)

// @title Palembang Digital API
// @version 1.0.0
// @description API documentation for palembangdigital.org

// @contact.name Palembang Digital
// @contact.url https://palembangdigital.org
// @contact.email support@palembangdigital.org

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @BasePath /api/v1

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting application on port %s...", port)

	// Setup router
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Recover())

	// Utility endpoints
	e.GET("/docs/api/v1/index.html", echoSwagger.WrapHandler)
	e.GET("/docs/api/v1/doc.json", echoSwagger.WrapHandler)
	e.GET("/docs/api/v1/*", echoSwagger.WrapHandler)
	e.GET("/ping", ping)

	// Serve API
	api := api.NewAPI()
	api.Register(e.Group("/api/v1", middleware.Logger()))

	// Serve UI
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:  "ui/build",
		HTML5: true,
	}))

	// Start server
	s := &http.Server{
		Addr:         "0.0.0.0:" + port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	e.Logger.Fatal(e.StartServer(s))
}

// ping write pong to http.ResponseWriter.
func ping(c echo.Context) error {
	return c.String(http.StatusOK, "pong")
}
