package services

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	"github.com/palembang-digital/website/pkg/models"
)

// BannersService service interface.
type BannersService interface {
	ListBanners(ctx context.Context) ([]models.Banner, error)
	GetBanner(ctx context.Context, id int64) (models.Banner, error)
	CreateBanner(ctx context.Context, banner models.Banner) (models.Banner, error)
	DeleteBanner(ctx context.Context, id int64) error
}

type bannersService struct {
	db *sqlx.DB
}

// NewBannersService returns an initialized BannersService implementation.
func NewBannersService(db *sqlx.DB) BannersService {
	return &bannersService{db: db}
}

func (s *bannersService) ListBanners(ctx context.Context) ([]models.Banner, error) {
	query := `
		SELECT
			id
			, text
			, created_at
			, updated_at
		FROM banners`

	var banners []models.Banner
	if err := s.db.SelectContext(ctx, &banners, query); err != nil {
		return nil, fmt.Errorf("get the list of banners: %s", err)
	}

	return banners, nil
}

func (s *bannersService) GetBanner(ctx context.Context, id int64) (models.Banner, error) {
	query := `
		SELECT
			id
			, text
			, created_at
			, updated_at
		FROM banners
		WHERE id = $1`

	var banner models.Banner
	if err := s.db.GetContext(ctx, &banner, query, id); err != nil {
		return models.Banner{}, fmt.Errorf("get an banner: %s", err)
	}

	return banner, nil
}

func (s *bannersService) CreateBanner(ctx context.Context, banner models.Banner) (models.Banner, error) {
	query := "INSERT INTO banners (text) VALUES ($1) RETURNING id"

	var id int64
	if err := s.db.QueryRowxContext(ctx, query, banner.Text).Scan(&id); err != nil {
		return models.Banner{}, fmt.Errorf("insert new banner: %s", err)
	}

	newBanner, err := s.GetBanner(ctx, id)
	if err != nil {
		return models.Banner{}, fmt.Errorf("get new banner: %s", err)
	}

	return newBanner, nil
}

func (s *bannersService) DeleteBanner(ctx context.Context, id int64) error {
	query := `DELETE FROM banners WHERE id = $1`

	if _, err := s.db.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("delete an banner: %s", err)
	}

	return nil
}
