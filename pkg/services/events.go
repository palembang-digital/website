package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
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
	db db.Querier
}

// NewEventsService returns an initialized EventsService implementation.
func NewEventsService(db db.Querier) EventsService {
	return &eventsService{db: db}
}

func (s *eventsService) ListEvents(ctx context.Context) ([]models.Event, error) {
	dbEvents, err := s.db.ListEvents(ctx)
	if err != nil {
		return nil, fmt.Errorf("get the list of events: %s", err)
	}

	var events []models.Event
	for _, dbEvent := range dbEvents {
		var event models.Event
		event.ID = dbEvent.ID
		event.Title = dbEvent.Title
		event.Description = dbEvent.Description.String
		event.ImageURL = dbEvent.ImageUrl.String
		event.RegistrationURL = dbEvent.RegistrationUrl.String
		event.YoutubeID = dbEvent.YoutubeID.String
		event.RegistrationFee = int(dbEvent.RegistrationFee.Int32)
		event.ScheduledStart = &dbEvent.ScheduledStart
		event.ScheduledEnd = &dbEvent.ScheduledEnd
		event.CreatedAt = &dbEvent.CreatedAt
		if dbEvent.UpdatedAt.Valid {
			event.UpdatedAt = &dbEvent.UpdatedAt.Time
		} else {
			event.UpdatedAt = nil
		}
		events = append(events, event)
	}
	return events, nil
}

func (s *eventsService) GetEvent(ctx context.Context, id int64) (models.Event, error) {
	dbEvent, err := s.db.GetEvent(ctx, id)
	if err != nil {
		return models.Event{}, fmt.Errorf("get an event: %s", err)
	}

	var event models.Event
	event.ID = dbEvent.ID
	event.Title = dbEvent.Title
	event.Description = dbEvent.Description.String
	event.ImageURL = dbEvent.ImageUrl.String
	event.RegistrationURL = dbEvent.RegistrationUrl.String
	event.YoutubeID = dbEvent.YoutubeID.String
	event.RegistrationFee = int(dbEvent.RegistrationFee.Int32)
	event.ScheduledStart = &dbEvent.ScheduledStart
	event.ScheduledEnd = &dbEvent.ScheduledEnd
	event.CreatedAt = &dbEvent.CreatedAt
	if dbEvent.UpdatedAt.Valid {
		event.UpdatedAt = &dbEvent.UpdatedAt.Time
	} else {
		event.UpdatedAt = nil
	}

	return event, nil
}

func (s *eventsService) CreateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	var eventParams db.CreateEventParams
	eventParams.Title = event.Title
	eventParams.Description.Scan(event.Description)
	eventParams.ImageUrl.Scan(event.ImageURL)
	eventParams.RegistrationUrl.Scan(event.RegistrationURL)
	eventParams.YoutubeID.Scan(event.YoutubeID)
	eventParams.RegistrationFee.Scan(event.RegistrationFee)
	eventParams.ScheduledStart = *event.ScheduledStart
	eventParams.ScheduledEnd = *event.ScheduledEnd

	id, err := s.db.CreateEvent(ctx, eventParams)
	if err != nil {
		return models.Event{}, fmt.Errorf("insert new event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return models.Event{}, fmt.Errorf("get new event: %s", err)
	}

	return newEvent, nil
}

func (s *eventsService) UpdateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	var eventParams db.UpdateEventParams
	eventParams.Title = event.Title
	eventParams.Description.Scan(event.Description)
	eventParams.ImageUrl.Scan(event.ImageURL)
	eventParams.RegistrationUrl.Scan(event.RegistrationURL)
	eventParams.YoutubeID.Scan(event.YoutubeID)
	eventParams.RegistrationFee.Scan(event.RegistrationFee)
	eventParams.ScheduledStart = *event.ScheduledStart
	eventParams.ScheduledEnd = *event.ScheduledEnd
	eventParams.ID = event.ID

	id, err := s.db.UpdateEvent(ctx, eventParams)
	if err != nil {
		return models.Event{}, fmt.Errorf("update event: %s", err)
	}

	newEvent, err := s.GetEvent(ctx, id)
	if err != nil {
		return models.Event{}, fmt.Errorf("get updated event: %s", err)
	}

	return newEvent, nil
}

func (s *eventsService) DeleteEvent(ctx context.Context, id int64) error {
	if err := s.db.DeleteEvent(ctx, id); err != nil {
		return fmt.Errorf("delete an event: %s", err)
	}

	return nil
}
