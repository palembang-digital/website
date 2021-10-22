// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"context"
	"database/sql"
)

type Querier interface {
	CreateBanner(ctx context.Context, text string) (int64, error)
	CreateEvent(ctx context.Context, arg CreateEventParams) (int64, error)
	CreateOrganization(ctx context.Context, arg CreateOrganizationParams) (int64, error)
	CreateStartup(ctx context.Context, arg CreateStartupParams) (int64, error)
	DeleteBanner(ctx context.Context, id int64) error
	DeleteEvent(ctx context.Context, id int64) error
	DeleteOrganization(ctx context.Context, id int64) error
	DeleteStartup(ctx context.Context, id int64) error
	GetBanner(ctx context.Context, id int64) (Banner, error)
	GetEvent(ctx context.Context, id int64) (GetEventRow, error)
	GetOrganization(ctx context.Context, id int64) (Organization, error)
	GetStartupByID(ctx context.Context, id int64) (GetStartupByIDRow, error)
	GetStartupBySlug(ctx context.Context, slug sql.NullString) (GetStartupBySlugRow, error)
	ListBanners(ctx context.Context) ([]Banner, error)
	ListEvents(ctx context.Context) ([]ListEventsRow, error)
	ListOrganizations(ctx context.Context) ([]Organization, error)
	ListStartups(ctx context.Context) ([]ListStartupsRow, error)
	UpdateEvent(ctx context.Context, arg UpdateEventParams) (int64, error)
}

var _ Querier = (*Queries)(nil)
