package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
)

// OrganizationsService service interface.
type OrganizationsService interface {
	ListOrganizations(ctx context.Context) ([]db.Organization, error)
	GetOrganization(ctx context.Context, id int64) (db.Organization, error)
	CreateOrganization(ctx context.Context, organization db.Organization) (db.Organization, error)
	DeleteOrganization(ctx context.Context, id int64) error
}

type organizationsService struct {
	db db.Querier
}

// NewOrganizationsService returns an initialized OrganizationsService implementation.
func NewOrganizationsService(db db.Querier) OrganizationsService {
	return &organizationsService{db: db}
}

func (s *organizationsService) ListOrganizations(ctx context.Context) ([]db.Organization, error) {
	organizations, err := s.db.ListOrganizations(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of organizations: %s", err)
	}

	return organizations, nil
}

func (s *organizationsService) GetOrganization(ctx context.Context, id int64) (db.Organization, error) {
	organization, err := s.db.GetOrganization(ctx, id)
	if err != nil {
		return db.Organization{}, fmt.Errorf("get an organization: %s", err)
	}

	return organization, nil
}

func (s *organizationsService) CreateOrganization(ctx context.Context, organization db.Organization) (db.Organization, error) {
	id, err := s.db.CreateOrganization(ctx, db.CreateOrganizationParams{
		Name:     organization.Name,
		ImageUrl: organization.ImageUrl,
	})
	if err != nil {
		return db.Organization{}, fmt.Errorf("insert new organization: %s", err)
	}

	newOrganization, err := s.GetOrganization(ctx, id)
	if err != nil {
		return db.Organization{}, fmt.Errorf("get new organization: %s", err)
	}

	return newOrganization, nil
}

func (s *organizationsService) DeleteOrganization(ctx context.Context, id int64) error {
	if err := s.db.DeleteOrganization(ctx, id); err != nil {
		return fmt.Errorf("delete an organization: %s", err)
	}

	return nil
}
