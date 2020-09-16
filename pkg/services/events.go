package services

import (
	"context"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"

	"github.com/palembang-digital/website/pkg/models"
)

// EventsService service interface.
type EventsService interface {
	ListEvents(ctx context.Context) ([]models.Event, error)
	GetEvent(ctx context.Context, id int64) (models.Event, error)
	CreateEvent(ctx context.Context, event models.Event) (models.Event, error)
	DeleteEvent(ctx context.Context, id int64) error
	UpdateEvent(ctx context.Context, event models.Event) (models.Event, error)
}

type eventsService struct {
	db *sqlx.DB
}

// NewEventsService returns an initialized EventsService implementation.
func NewEventsService(db *sqlx.DB) EventsService {
	return &eventsService{db: db}
}

func (s *eventsService) ListEvents(ctx context.Context) ([]models.Event, error) {
	query := `
		SELECT
			id
			, title
			, image_url
			, registration_url
			, scheduled_start
			, scheduled_end
			, created_at
			, updated_at
		FROM events`

	var events []models.Event
	if err := s.db.SelectContext(ctx, &events, query); err != nil {
		return nil, fmt.Errorf("get the list of events: %s", err)
	}

	return events, nil
}

func (s *eventsService) GetEvent(ctx context.Context, id int64) (models.Event, error) {
	query := `
		SELECT
			id
			, title
			, image_url
			, registration_url
			, scheduled_start
			, scheduled_end
			, created_at
			, updated_at
		FROM events
		WHERE id = $1`

	var event models.Event
	if err := s.db.GetContext(ctx, &event, query, id); err != nil {
		return models.Event{}, fmt.Errorf("get an event: %s", err)
	}

	return event, nil
}

func (s *eventsService) CreateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	query := "INSERT INTO events (title, image_url, registration_url, scheduled_start, scheduled_end) VALUES ($1, $2, $3, $4, $5) RETURNING id"

	var id int64
	if err := s.db.QueryRowxContext(ctx, query, event.Title, event.ImageURL, event.RegistrationURL, event.ScheduledStart, event.ScheduledEnd).Scan(&id); err != nil {
		return models.Event{}, fmt.Errorf("insert new event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return models.Event{}, fmt.Errorf("get new event: %s", err)
	}

	return newEvent, nil
}

func (s *eventsService) DeleteEvent(ctx context.Context, id int64) error {
	query := `DELETE FROM events WHERE id = $1`

	if _, err := s.db.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("delete an event: %s", err)
	}

	return nil
}

func (s *eventsService) UpdateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	query := `UPDATE events SET title=$1, image_url=$2, registration_url=$3, scheduled_start=$4, scheduled_end=$5 , updated_at=$6 Where id=$7`

	if _, err := s.db.ExecContext(ctx, query, event.Title, event.ImageURL, event.RegistrationURL, event.ScheduledStart, event.ScheduledEnd, time.Now(), event.ID); err != nil {
		return models.Event{}, fmt.Errorf("Update event: %s", err)
	}

	Event, err := s.GetEvent(ctx, event.ID)
	if err != nil {
		return models.Event{}, fmt.Errorf("get event: %s", err)
	}

	return Event, nil
}
