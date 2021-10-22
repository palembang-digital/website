package services

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
	"github.com/palembang-digital/website/pkg/models"
)

// StartupsService service interface.
type StartupsService interface {
	ListStartups(ctx context.Context) ([]models.Startup, error)
	GetStartupByID(ctx context.Context, id int64) (models.Startup, error)
	GetStartupBySlug(ctx context.Context, slug string) (models.Startup, error)
	CreateStartup(ctx context.Context, startup models.Startup) (models.Startup, error)
	DeleteStartup(ctx context.Context, id int64) error
}

type startupsService struct {
	db db.Querier
}

// NewStartupsService returns an initialized StartupsService implementation.
func NewStartupsService(db db.Querier) StartupsService {
	return &startupsService{db: db}
}

func (s *startupsService) ListStartups(ctx context.Context) ([]models.Startup, error) {
	dbStartups, err := s.db.ListStartups(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of startups: %s", err)
	}

	var startups []models.Startup
	for _, dbStartup := range dbStartups {
		var startup models.Startup
		startup.ID = dbStartup.ID
		startup.Name = dbStartup.Name
		startup.ImageURL = dbStartup.ImageUrl.String
		startup.Slug = dbStartup.Slug.String
		startup.OneLiner = dbStartup.OneLiner.String
		startup.Description = dbStartup.Description.String
		startup.CreatedAt = &dbStartup.CreatedAt
		if dbStartup.UpdatedAt.Valid {
			startup.UpdatedAt = &dbStartup.UpdatedAt.Time
		} else {
			startup.UpdatedAt = nil
		}
		startups = append(startups, startup)
	}

	return startups, nil
}

func (s *startupsService) GetStartupByID(ctx context.Context, id int64) (models.Startup, error) {
	dbStartup, err := s.db.GetStartupByID(ctx, id)
	if err != nil {
		return models.Startup{}, fmt.Errorf("get an startup by id (%d): %s", id, err)
	}

	var startup models.Startup
	startup.ID = dbStartup.ID
	startup.Name = dbStartup.Name
	startup.ImageURL = dbStartup.ImageUrl.String
	startup.Slug = dbStartup.Slug.String
	startup.OneLiner = dbStartup.OneLiner.String
	startup.Description = dbStartup.Description.String
	startup.CreatedAt = &dbStartup.CreatedAt
	if dbStartup.UpdatedAt.Valid {
		startup.UpdatedAt = &dbStartup.UpdatedAt.Time
	} else {
		startup.UpdatedAt = nil
	}

	return startup, nil
}

func (s *startupsService) GetStartupBySlug(ctx context.Context, slug string) (models.Startup, error) {
	slugValue := &sql.NullString{}
	slugValue.Scan(slug)
	dbStartup, err := s.db.GetStartupBySlug(ctx, *slugValue)
	if err != nil {
		return models.Startup{}, fmt.Errorf("get an startup by slug (%s): %s", slug, err)
	}

	var startup models.Startup
	startup.ID = dbStartup.ID
	startup.Name = dbStartup.Name
	startup.ImageURL = dbStartup.ImageUrl.String
	startup.Slug = dbStartup.Slug.String
	startup.OneLiner = dbStartup.OneLiner.String
	startup.Description = dbStartup.Description.String
	startup.CreatedAt = &dbStartup.CreatedAt
	if dbStartup.UpdatedAt.Valid {
		startup.UpdatedAt = &dbStartup.UpdatedAt.Time
	} else {
		startup.UpdatedAt = nil
	}

	return startup, nil
}

func (s *startupsService) CreateStartup(ctx context.Context, startup models.Startup) (models.Startup, error) {
	var startupParams db.CreateStartupParams
	startupParams.Name = startup.Name
	startupParams.ImageUrl.Scan(startup.ImageURL)
	startupParams.Slug.Scan(startup.Slug)
	startupParams.OneLiner.Scan(startup.OneLiner)
	startupParams.Description.Scan(startup.Description)
	startupParams.Website.Scan(startup.Website)

	id, err := s.db.CreateStartup(ctx, startupParams)
	if err != nil {
		return models.Startup{}, fmt.Errorf("insert new startup: %s", err)
	}

	newStartup, err := s.GetStartupByID(ctx, id)
	if err != nil {
		return models.Startup{}, fmt.Errorf("get new startup: %s", err)
	}

	return newStartup, nil
}

func (s *startupsService) DeleteStartup(ctx context.Context, id int64) error {
	if err := s.db.DeleteStartup(ctx, id); err != nil {
		return fmt.Errorf("delete an startup: %s", err)
	}

	return nil
}
