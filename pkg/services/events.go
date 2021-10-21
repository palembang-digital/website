package services

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	"github.com/palembang-digital/website/pkg/models"
)

// EventsService service interface.
type EventsService interface {
	ListEvents(ctx context.Context) ([]models.Event, error)
	GetEvent(ctx context.Context, id int64) (models.Event, error)
	CreateEvent(ctx context.Context, event models.Event) (models.Event, error)
	UpdateEvent(ctx context.Context, event models.Event) (models.Event, error)
	DeleteEvent(ctx context.Context, id int64) error
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
			, youtube_id
			, registration_fee
			, scheduled_start
			, scheduled_end
			, created_at
			, updated_at
		FROM events`

	events := []models.Event{}
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
			, youtube_id
			, registration_fee
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
	query := "INSERT INTO events (title, image_url, registration_url, youtube_id, registration_fee, scheduled_start, scheduled_end) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id"

	var id int64
	if err := s.db.QueryRowxContext(ctx, query, event.Title, event.ImageURL, event.RegistrationURL, event.YoutubeID, event.RegistrationFee, event.ScheduledStart, event.ScheduledEnd).Scan(&id); err != nil {
		return models.Event{}, fmt.Errorf("insert new event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return models.Event{}, fmt.Errorf("get new event: %s", err)
	}

	return newEvent, nil
}

func (s *eventsService) UpdateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	query := `
		UPDATE events SET
			title = $1
			, image_url = $2
			, registration_url = $3
			, youtube_id = $4
			, registration_fee = $5
			, scheduled_start = $6
			, scheduled_end = $7
			, updated_at = CURRENT_TIMESTAMP
		WHERE id = $8
		RETURNING id`

	var id int64
	if err := s.db.QueryRowxContext(
		ctx, query, event.Title, event.ImageURL, event.RegistrationURL, event.YoutubeID, event.RegistrationFee, event.ScheduledStart, event.ScheduledEnd, event.ID,
	).Scan(&id); err != nil {
		return models.Event{}, fmt.Errorf("update event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return models.Event{}, fmt.Errorf("get updated event: %s", err)
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
