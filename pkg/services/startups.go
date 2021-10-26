package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
)

// StartupsService service interface.
type StartupsService interface {
	ListStartups(ctx context.Context) ([]db.Startup, error)
	GetStartupByID(ctx context.Context, id int64) (db.Startup, error)
	GetStartupBySlug(ctx context.Context, slug string) (db.Startup, error)
	CreateStartup(ctx context.Context, startup db.Startup) (db.Startup, error)
	DeleteStartup(ctx context.Context, id int64) error
}

type startupsService struct {
	db db.Querier
}

// NewStartupsService returns an initialized StartupsService implementation.
func NewStartupsService(db db.Querier) StartupsService {
	return &startupsService{db: db}
}

func (s *startupsService) ListStartups(ctx context.Context) ([]db.Startup, error) {
	startups, err := s.db.ListStartups(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of startups: %s", err)
	}

	return startups, nil
}

func (s *startupsService) GetStartupByID(ctx context.Context, id int64) (db.Startup, error) {
	startup, err := s.db.GetStartupByID(ctx, id)
	if err != nil {
		return db.Startup{}, fmt.Errorf("get an startup by id (%d): %s", id, err)
	}

	return startup, nil
}

func (s *startupsService) GetStartupBySlug(ctx context.Context, slug string) (db.Startup, error) {
	startup, err := s.db.GetStartupBySlug(ctx, slug)
	if err != nil {
		return db.Startup{}, fmt.Errorf("get an startup by slug (%s): %s", slug, err)
	}

	return startup, nil
}

func (s *startupsService) CreateStartup(ctx context.Context, startup db.Startup) (db.Startup, error) {
	id, err := s.db.CreateStartup(ctx, db.CreateStartupParams{
		Name:        startup.Name,
		ImageUrl:    startup.ImageUrl,
		Slug:        startup.Slug,
		OneLiner:    startup.OneLiner,
		Description: startup.Description,
		Website:     startup.Website,
	})
	if err != nil {
		return db.Startup{}, fmt.Errorf("insert new startup: %s", err)
	}

	newStartup, err := s.GetStartupByID(ctx, id)
	if err != nil {
		return db.Startup{}, fmt.Errorf("get new startup: %s", err)
	}

	return newStartup, nil
}

func (s *startupsService) DeleteStartup(ctx context.Context, id int64) error {
	if err := s.db.DeleteStartup(ctx, id); err != nil {
		return fmt.Errorf("delete an startup: %s", err)
	}

	return nil
}
