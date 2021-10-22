package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
	"github.com/palembang-digital/website/pkg/models"
)

// OrganizationsService service interface.
type OrganizationsService interface {
	ListOrganizations(ctx context.Context) ([]models.Organization, error)
	GetOrganization(ctx context.Context, id int64) (models.Organization, error)
	CreateOrganization(ctx context.Context, organization models.Organization) (models.Organization, error)
	DeleteOrganization(ctx context.Context, id int64) error
}

type organizationsService struct {
	db db.Querier
}

// NewOrganizationsService returns an initialized OrganizationsService implementation.
func NewOrganizationsService(db db.Querier) OrganizationsService {
	return &organizationsService{db: db}
}

func (s *organizationsService) ListOrganizations(ctx context.Context) ([]models.Organization, error) {
	dbOrganizations, err := s.db.ListOrganizations(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of organizations: %s", err)
	}

	organizations := []models.Organization{}
	for _, dbOrganization := range dbOrganizations {
		var organization models.Organization
		organization.ID = dbOrganization.ID
		organization.Name = dbOrganization.Name
		organization.ImageURL = dbOrganization.ImageUrl.String
		organization.CreatedAt = &dbOrganization.CreatedAt
		if dbOrganization.UpdatedAt.Valid {
			organization.UpdatedAt = &dbOrganization.UpdatedAt.Time
		} else {
			organization.UpdatedAt = nil
		}
		organizations = append(organizations, organization)
	}

	return organizations, nil
}

func (s *organizationsService) GetOrganization(ctx context.Context, id int64) (models.Organization, error) {
	dbOrganization, err := s.db.GetOrganization(ctx, id)
	if err != nil {
		return models.Organization{}, fmt.Errorf("get an organization: %s", err)
	}

	var organization models.Organization
	organization.ID = dbOrganization.ID
	organization.Name = dbOrganization.Name
	organization.ImageURL = dbOrganization.ImageUrl.String
	organization.CreatedAt = &dbOrganization.CreatedAt
	if dbOrganization.UpdatedAt.Valid {
		organization.UpdatedAt = &dbOrganization.UpdatedAt.Time
	} else {
		organization.UpdatedAt = nil
	}

	return organization, nil
}

func (s *organizationsService) CreateOrganization(ctx context.Context, organization models.Organization) (models.Organization, error) {
	var organizationParams db.CreateOrganizationParams
	organizationParams.Name = organization.Name
	organizationParams.ImageUrl.Scan(organization.ImageURL)

	id, err := s.db.CreateOrganization(ctx, organizationParams)
	if err != nil {
		return models.Organization{}, fmt.Errorf("insert new organization: %s", err)
	}

	newOrganization, err := s.GetOrganization(ctx, id)
	if err != nil {
		return models.Organization{}, fmt.Errorf("get new organization: %s", err)
	}

	return newOrganization, nil
}

func (s *organizationsService) DeleteOrganization(ctx context.Context, id int64) error {
	if err := s.db.DeleteOrganization(ctx, id); err != nil {
		return fmt.Errorf("delete an organization: %s", err)
	}

	return nil
}
