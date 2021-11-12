package main

import (
	"context"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/kelseyhightower/envconfig"
	"google.golang.org/api/option"
)

// Config stores the application configurations.
type Config struct {
	Port        string `envconfig:"PORT" default:"8080"`
	UIBuildPath string `envconfig:"UI_BUILD_PATH" default:"ui/build"`

	AdminUsername string `envconfig:"ADMIN_USERNAME" default:"admin"`
	AdminPassword string `envconfig:"ADMIN_PASSWORD" default:"admin"`

	Database DatabaseConfig
}

// DatabaseConfig stores database configurations.
type DatabaseConfig struct {
	URL            string `envconfig:"DATABASE_URL" required:"true"`
	Driver         string `envconfig:"DATABASE_DRIVER" default:"postgres"`
	MigrationsPath string `envconfig:"DATABASE_MIGRATIONS_PATH" required:"true" default:"file://sql/schema"`
}

// ReadConfig populates configurations from environment variables.
func ReadConfig() (Config, error) {
	var cfg Config
	if err := envconfig.Process("", &cfg); err != nil {
		return Config{}, err
	}
	return cfg, nil
}

func SetupFirebase() *auth.Client {
	opt := option.WithCredentialsFile("firebase_secret_admin_key.json")
	// opt := option.WithCredentialsJSON(read from env)

	// Firebase Admin SDK
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		panic("Firebase load error")
	}

	// Firebase Auth
	auth, err := app.Auth(context.Background())
	if err != nil {
		panic("Firebase load error")
	}
	return auth
}
