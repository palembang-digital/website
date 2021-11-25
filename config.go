package main

import (
	"github.com/kelseyhightower/envconfig"
)

// Config stores the application configurations.
type Config struct {
	Port        string `envconfig:"PORT" default:"8080"`
	UIBuildPath string `envconfig:"UI_BUILD_PATH" default:"ui/build"`

	AdminUsername string `envconfig:"ADMIN_USERNAME" default:"admin"`
	AdminPassword string `envconfig:"ADMIN_PASSWORD" default:"admin"`

	Database DatabaseConfig
	Firebase FirebaseConfig
	ReactApp ReactAppConfig
}

// DatabaseConfig stores database configurations.
type DatabaseConfig struct {
	URL            string `envconfig:"DATABASE_URL" required:"true"`
	Driver         string `envconfig:"DATABASE_DRIVER" default:"postgres"`
	MigrationsPath string `envconfig:"DATABASE_MIGRATIONS_PATH" required:"true" default:"file://sql/schema"`
}

type FirebaseConfig struct {
	CredentialType  string `envconfig:"FIREBASE_CREDENTIAL_TYPE"`
	CredentialValue string `envconfig:"FIREBASE_CREDENTIAL_VALUE"`
}

type ReactAppConfig struct {
	FirebaseApiKey            string `envconfig:"REACT_APP_FIREBASE_API_KEY" json:"REACT_APP_FIREBASE_API_KEY"`
	FirebaseAuthDomain        string `envconfig:"REACT_APP_FIREBASE_AUTH_DOMAIN" json:"REACT_APP_FIREBASE_AUTH_DOMAIN"`
	FirebaseProjectID         string `envconfig:"REACT_APP_FIREBASE_PROJECT_ID" json:"REACT_APP_FIREBASE_PROJECT_ID"`
	FirebaseStorageBucket     string `envconfig:"REACT_APP_FIREBASE_STORAGE_BUCKET" json:"REACT_APP_FIREBASE_STORAGE_BUCKET"`
	FirebaseMessagingSenderID string `envconfig:"REACT_APP_FIREBASE_MESSAGING_SENDER_ID" json:"REACT_APP_FIREBASE_MESSAGING_SENDER_ID"`
	FirebaseAppID             string `envconfig:"REACT_APP_FIREBASE_APP_ID" json:"REACT_APP_FIREBASE_APP_ID"`
	FirebaseMeasurementID     string `envconfig:"REACT_APP_FIREBASE_MEASUREMENT_ID" json:"REACT_APP_FIREBASE_MEASUREMENT_ID"`
}

// ReadConfig populates configurations from environment variables.
func ReadConfig() (Config, error) {
	var cfg Config
	if err := envconfig.Process("", &cfg); err != nil {
		return Config{}, err
	}
	return cfg, nil
}
