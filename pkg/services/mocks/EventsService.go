// Code generated by mockery v2.9.4. DO NOT EDIT.

package mocks

import (
	context "context"

	models "github.com/palembang-digital/website/pkg/models"
	mock "github.com/stretchr/testify/mock"
)

// EventsService is an autogenerated mock type for the EventsService type
type EventsService struct {
	mock.Mock
}

// CreateEvent provides a mock function with given fields: ctx, event
func (_m *EventsService) CreateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	ret := _m.Called(ctx, event)

	var r0 models.Event
	if rf, ok := ret.Get(0).(func(context.Context, models.Event) models.Event); ok {
		r0 = rf(ctx, event)
	} else {
		r0 = ret.Get(0).(models.Event)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, models.Event) error); ok {
		r1 = rf(ctx, event)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteEvent provides a mock function with given fields: ctx, id
func (_m *EventsService) DeleteEvent(ctx context.Context, id int64) error {
	ret := _m.Called(ctx, id)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, int64) error); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// GetEvent provides a mock function with given fields: ctx, id
func (_m *EventsService) GetEvent(ctx context.Context, id int64) (models.Event, error) {
	ret := _m.Called(ctx, id)

	var r0 models.Event
	if rf, ok := ret.Get(0).(func(context.Context, int64) models.Event); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(models.Event)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, int64) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ListEvents provides a mock function with given fields: ctx
func (_m *EventsService) ListEvents(ctx context.Context) ([]models.Event, error) {
	ret := _m.Called(ctx)

	var r0 []models.Event
	if rf, ok := ret.Get(0).(func(context.Context) []models.Event); ok {
		r0 = rf(ctx)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]models.Event)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context) error); ok {
		r1 = rf(ctx)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateEvent provides a mock function with given fields: ctx, event
func (_m *EventsService) UpdateEvent(ctx context.Context, event models.Event) (models.Event, error) {
	ret := _m.Called(ctx, event)

	var r0 models.Event
	if rf, ok := ret.Get(0).(func(context.Context, models.Event) models.Event); ok {
		r0 = rf(ctx, event)
	} else {
		r0 = ret.Get(0).(models.Event)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, models.Event) error); ok {
		r1 = rf(ctx, event)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
