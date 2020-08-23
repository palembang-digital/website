package main

import "github.com/kelseyhightower/envconfig"

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
	MigrationsPath string `envconfig:"DATABASE_MIGRATIONS_PATH" required:"true" default:"file://migrations/postgresql"`
}

// ReadConfig populates configurations from environment variables.
func ReadConfig() (Config, error) {
	var cfg Config
	if err := envconfig.Process("", &cfg); err != nil {
		return Config{}, err
	}
	return cfg, nil
}
