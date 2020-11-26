package services

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

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
	db *sqlx.DB
}

// NewOrganizationsService returns an initialized OrganizationsService implementation.
func NewOrganizationsService(db *sqlx.DB) OrganizationsService {
	return &organizationsService{db: db}
}

func (s *organizationsService) ListOrganizations(ctx context.Context) ([]models.Organization, error) {
	query := `
		SELECT
			id
			, name
			, image_url
			, created_at
			, updated_at
		FROM organizations`

	var organizations []models.Organization
	if err := s.db.SelectContext(ctx, &organizations, query); err != nil {
		return nil, fmt.Errorf("get the list of organizations: %s", err)
	}

	return organizations, nil
}

func (s *organizationsService) GetOrganization(ctx context.Context, id int64) (models.Organization, error) {
	query := `
		SELECT
			id
			, name
			, image_url
			, created_at
			, updated_at
		FROM organizations
		WHERE id = $1`

	var organization models.Organization
	if err := s.db.GetContext(ctx, &organization, query, id); err != nil {
		return models.Organization{}, fmt.Errorf("get an organization: %s", err)
	}

	return organization, nil
}

func (s *organizationsService) CreateOrganization(ctx context.Context, organization models.Organization) (models.Organization, error) {
	query := "INSERT INTO organizations (name, image_url) VALUES ($1, $2) RETURNING id"

	var id int64
	if err := s.db.QueryRowxContext(ctx, query, organization.Name, organization.ImageURL).Scan(&id); err != nil {
		return models.Organization{}, fmt.Errorf("insert new organization: %s", err)
	}

	newOrganization, err := s.GetOrganization(ctx, id)
	if err != nil {
		return models.Organization{}, fmt.Errorf("get new organization: %s", err)
	}

	return newOrganization, nil
}

func (s *organizationsService) DeleteOrganization(ctx context.Context, id int64) error {
	query := `DELETE FROM organizations WHERE id = $1`

	if _, err := s.db.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("delete an organization: %s", err)
	}

	return nil
}
