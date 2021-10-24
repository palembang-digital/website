package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
)

// BannersService service interface.
type BannersService interface {
	ListBanners(ctx context.Context) ([]db.Banner, error)
	GetBanner(ctx context.Context, id int64) (db.Banner, error)
	CreateBanner(ctx context.Context, banner db.Banner) (db.Banner, error)
	DeleteBanner(ctx context.Context, id int64) error
}

type bannersService struct {
	db db.Querier
}

// NewBannersService returns an initialized BannersService implementation.
func NewBannersService(db db.Querier) BannersService {
	return &bannersService{db: db}
}

func (s *bannersService) ListBanners(ctx context.Context) ([]db.Banner, error) {
	banners, err := s.db.ListBanners(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of banners: %s", err)
	}

	return banners, nil
}

func (s *bannersService) GetBanner(ctx context.Context, id int64) (db.Banner, error) {
	banner, err := s.db.GetBanner(ctx, id)
	if err != nil {
		return db.Banner{}, fmt.Errorf("get an banner: %s", err)
	}

	return banner, nil
}

func (s *bannersService) CreateBanner(ctx context.Context, banner db.Banner) (db.Banner, error) {
	id, err := s.db.CreateBanner(ctx, banner.Text)
	if err != nil {
		return db.Banner{}, fmt.Errorf("insert new banner: %s", err)
	}

	newBanner, err := s.GetBanner(ctx, id)
	if err != nil {
		return db.Banner{}, fmt.Errorf("get new banner: %s", err)
	}

	return newBanner, nil
}

func (s *bannersService) DeleteBanner(ctx context.Context, id int64) error {
	if err := s.db.DeleteBanner(ctx, id); err != nil {
		return fmt.Errorf("delete an banner: %s", err)
	}

	return nil
}
