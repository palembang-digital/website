package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"google.golang.org/api/option"

	"github.com/palembang-digital/website/api/v1"
	_ "github.com/palembang-digital/website/api/v1/docs"
	apiMiddleware "github.com/palembang-digital/website/api/v1/middleware"
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

	log.Println("Setup firebase ...")
	firebaseAuth, err := initFirebaseAuth(cfg.Firebase)
	if err != nil {
		panic(err)
	}

	log.Println("Initializing services ...")
	queries := db.New(conn)
	bannersService := services.NewBannersService(queries)
	eventsService := services.NewEventsService(queries)
	organizationsService := services.NewOrganizationsService(queries)
	startupsService := services.NewStartupsService(queries)
	usersService := services.NewUsersService(queries)

	log.Println("Initializing the web server ...")
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())

	// Add firebase auth client to context
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("firebaseAuth", firebaseAuth)
			return next(c)
		}
	})

	e.Use(middleware.Recover())

	// Utility endpoints
	e.GET("/docs/api/v1/index.html", echoSwagger.WrapHandler)
	e.GET("/docs/api/v1/doc.json", echoSwagger.WrapHandler)
	e.GET("/docs/api/v1/*", echoSwagger.WrapHandler)
	e.GET("/ping", ping)
	e.GET("/ping2", pingAuth, apiMiddleware.Auth)

	// Serve API
	api := api.NewAPI(bannersService, eventsService, organizationsService, startupsService, usersService, cfg.AdminUsername, cfg.AdminPassword)
	api.Register(e.Group("/api/v1", middleware.Logger()))

	// Serve env.js for UI
	uiEnv := uiEnvHandler{
		reactAppConfig: cfg.ReactApp,
	}
	e.GET("/env.js", uiEnv.Handler)

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

func initFirebaseAuth(firebaseConfig FirebaseConfig) (*auth.Client, error) {
	var opt option.ClientOption

	if firebaseConfig.CredentialType == "file" {
		opt = option.WithCredentialsFile(firebaseConfig.CredentialValue)
	} else if firebaseConfig.CredentialType == "json" {
		opt = option.WithCredentialsJSON([]byte(firebaseConfig.CredentialValue))
	} else {
		return nil, fmt.Errorf("unsupported FIREBASE_CREDENTIAL_TYPE")
	}

	// Firebase Admin SDK
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, err
	}

	// Firebase Auth
	auth, err := app.Auth(context.Background())
	if err != nil {
		return nil, err
	}

	return auth, nil
}

// ping write pong to http.ResponseWriter.
func ping(c echo.Context) error {
	return c.String(http.StatusOK, "pong")
}

// ping write pong to http.ResponseWriter.
func pingAuth(c echo.Context) error {
	uuid := c.Get("UUID").(string)
	return c.String(http.StatusOK, "pong: "+uuid)
}

type uiEnvHandler struct {
	reactAppConfig ReactAppConfig
}

func (uiEnv uiEnvHandler) Handler(c echo.Context) error {
	envJSON, err := json.Marshal(uiEnv.reactAppConfig)
	if err != nil {
		return err
	}
	return c.String(http.StatusOK, fmt.Sprintf("window.env = %s;", envJSON))
}
