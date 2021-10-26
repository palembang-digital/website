package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
)

// EventsService service interface.
type EventsService interface {
	ListEvents(ctx context.Context) ([]db.Event, error)
	GetEvent(ctx context.Context, id int64) (db.Event, error)
	CreateEvent(ctx context.Context, event db.Event) (db.Event, error)
	UpdateEvent(ctx context.Context, event db.Event) (db.Event, error)
	DeleteEvent(ctx context.Context, id int64) error
}

type eventsService struct {
	db db.Querier
}

// NewEventsService returns an initialized EventsService implementation.
func NewEventsService(db db.Querier) EventsService {
	return &eventsService{db: db}
}

func (s *eventsService) ListEvents(ctx context.Context) ([]db.Event, error) {
	events, err := s.db.ListEvents(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of events: %s", err)
	}

	return events, nil
}

func (s *eventsService) GetEvent(ctx context.Context, id int64) (db.Event, error) {
	event, err := s.db.GetEvent(ctx, id)
	if err != nil {
		return db.Event{}, fmt.Errorf("get an event: %s", err)
	}

	return event, nil
}

func (s *eventsService) CreateEvent(ctx context.Context, event db.Event) (db.Event, error) {
	id, err := s.db.CreateEvent(ctx, db.CreateEventParams{
		Title:           event.Title,
		Description:     event.Description,
		ImageUrl:        event.ImageUrl,
		RegistrationUrl: event.RegistrationUrl,
		YoutubeID:       event.YoutubeID,
		RegistrationFee: event.RegistrationFee,
		ScheduledStart:  event.ScheduledStart,
		ScheduledEnd:    event.ScheduledEnd,
	})
	if err != nil {
		return db.Event{}, fmt.Errorf("insert new event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return db.Event{}, fmt.Errorf("get new event: %s", err)
	}

	return newEvent, nil
}

func (s *eventsService) UpdateEvent(ctx context.Context, event db.Event) (db.Event, error) {
	id, err := s.db.UpdateEvent(ctx, db.UpdateEventParams{
		Title:           event.Title,
		ImageUrl:        event.ImageUrl,
		RegistrationUrl: event.RegistrationUrl,
		YoutubeID:       event.YoutubeID,
		RegistrationFee: event.RegistrationFee,
		ScheduledStart:  event.ScheduledStart,
		ScheduledEnd:    event.ScheduledEnd,
		Description:     event.Description,
		ID:              event.ID,
	})
	if err != nil {
		return db.Event{}, fmt.Errorf("update event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return db.Event{}, fmt.Errorf("get updated event: %s", err)
	}

	return newEvent, nil
}

func (s *eventsService) DeleteEvent(ctx context.Context, id int64) error {
	if err := s.db.DeleteEvent(ctx, id); err != nil {
		return fmt.Errorf("delete an event: %s", err)
	}

	return nil
}
