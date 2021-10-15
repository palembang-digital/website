package services

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

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
	db *sqlx.DB
}

// NewStartupsService returns an initialized StartupsService implementation.
func NewStartupsService(db *sqlx.DB) StartupsService {
	return &startupsService{db: db}
}

func (s *startupsService) ListStartups(ctx context.Context) ([]models.Startup, error) {
	query := `
		SELECT
			id
			, name
			, image_url
			, slug
			, one_liner
			, description
			, website
			, created_at
			, updated_at
		FROM startups`

	startups := []models.Startup{}
	if err := s.db.SelectContext(ctx, &startups, query); err != nil {
		return nil, fmt.Errorf("get the list of startups: %s", err)
	}

	return startups, nil
}

func (s *startupsService) GetStartupByID(ctx context.Context, id int64) (models.Startup, error) {
	query := `
		SELECT
			id
			, name
			, image_url
			, slug
			, one_liner
			, description
			, website
			, created_at
			, updated_at
		FROM startups
		WHERE id = $1`

	var startup models.Startup
	if err := s.db.GetContext(ctx, &startup, query, id); err != nil {
		return models.Startup{}, fmt.Errorf("get an startup by id (%d): %s", id, err)
	}

	return startup, nil
}

func (s *startupsService) GetStartupBySlug(ctx context.Context, slug string) (models.Startup, error) {
	query := `
		SELECT
			id
			, name
			, image_url
			, slug
			, one_liner
			, description
			, website
			, created_at
			, updated_at
		FROM startups
		WHERE slug = $1`

	var startup models.Startup
	if err := s.db.GetContext(ctx, &startup, query, slug); err != nil {
		return models.Startup{}, fmt.Errorf("get an startup by slug (%s): %s", slug, err)
	}

	return startup, nil
}

func (s *startupsService) CreateStartup(ctx context.Context, startup models.Startup) (models.Startup, error) {
	query := `
		INSERT INTO startups (
			name
			, image_url
			, slug
			, one_liner
			, description
			, website
		)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id`

	var id int64
	if err := s.db.QueryRowxContext(ctx, query,
		startup.Name,
		startup.ImageURL,
		startup.Slug,
		startup.OneLiner,
		startup.Description,
		startup.Website,
	).Scan(&id); err != nil {
		return models.Startup{}, fmt.Errorf("insert new startup: %s", err)
	}

	newStartup, err := s.GetStartupByID(ctx, id)
	if err != nil {
		return models.Startup{}, fmt.Errorf("get new startup: %s", err)
	}

	return newStartup, nil
}

func (s *startupsService) DeleteStartup(ctx context.Context, id int64) error {
	query := `DELETE FROM startups WHERE id = $1`

	if _, err := s.db.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("delete an startup: %s", err)
	}

	return nil
}
