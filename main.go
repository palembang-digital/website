package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"

	"github.com/palembang-digital/website/api/v1"
	_ "github.com/palembang-digital/website/api/v1/docs"
	"github.com/palembang-digital/website/pkg/db"
	"github.com/palembang-digital/website/pkg/services"
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
	log.Println("Reading the configuration from environment variables ...")
	cfg, err := ReadConfig()
	if err != nil {
		panic(err)
	}

	log.Println("Migrating the database ...")
	m, err := migrate.New(cfg.Database.MigrationsPath, cfg.Database.URL)
	if err != nil {
		panic(err)
	}
	if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		panic(err)
	}

	log.Println("Initializing the database connection ...")
	conn, err := pgxpool.Connect(context.Background(), cfg.Database.URL)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	log.Println("Initializing services ...")
	queries := db.New(conn)
	bannersService := services.NewBannersService(queries)
	eventsService := services.NewEventsService(queries)
	organizationsService := services.NewOrganizationsService(queries)
	startupsService := services.NewStartupsService(queries)

	log.Println("Initializing the web server ...")
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Recover())

	// Utility endpoints
	e.GET("/docs/api/v1/index.html", echoSwagger.WrapHandler)
	e.GET("/docs/api/v1/doc.json", echoSwagger.WrapHandler)
	e.GET("/docs/api/v1/*", echoSwagger.WrapHandler)
	e.GET("/ping", ping)

	// Serve API
	api := api.NewAPI(bannersService, eventsService, organizationsService, startupsService, cfg.AdminUsername, cfg.AdminPassword)
	api.Register(e.Group("/api/v1", middleware.Logger()))

	// Serve UI
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:  cfg.UIBuildPath,
		HTML5: true,
	}))

	// Start server
	s := &http.Server{
		Addr:         "0.0.0.0:" + cfg.Port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	e.Logger.Fatal(e.StartServer(s))
}

// ping write pong to http.ResponseWriter.
func ping(c echo.Context) error {
	return c.String(http.StatusOK, "pong")
}
