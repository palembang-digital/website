package services

import (
	"context"
	"fmt"

	"github.com/palembang-digital/website/pkg/db"
)

// UsersService service interface.
type UsersService interface {
	GetUser(ctx context.Context, uid string) (db.User, error)
	CreateUser(ctx context.Context, user db.User) (db.User, error)
	DeleteUser(ctx context.Context, uid string) error
}

type usersService struct {
	db db.Querier
}

// NewUsersService returns an initialized UsersService implementation.
func NewUsersService(db db.Querier) UsersService {
	return &usersService{db: db}
}

func (s *usersService) GetUser(ctx context.Context, uid string) (db.User, error) {
	user, err := s.db.GetUser(ctx, uid)
	if err != nil {
		return db.User{}, fmt.Errorf("get an user: %s", err)
	}

	return user, nil
}

func (s *usersService) CreateUser(ctx context.Context, user db.User) (db.User, error) {
	id, err := s.db.CreateUser(ctx, db.CreateUserParams{
		Uid:               user.Uid,
		Email:             user.Email,
		Name:              user.Name,
		Residence:         user.Residence,
		JobProfession:     user.JobProfession,
		SchoolName:        user.SchoolName,
		SchoolMajor:       user.SchoolMajor,
		SchoolSemester:    user.SchoolSemester,
		FindJobProfession: user.FindJobProfession,
		WhatsappNumber:    user.WhatsappNumber,
		TelegramNumber:    user.TelegramNumber,
		Motivation:        user.Motivation,
		InformationSource: user.InformationSource,
	})
	if err != nil {
		return db.User{}, fmt.Errorf("insert new user: %s", err)
	}

	newUser, err := s.GetUser(ctx, id)
	if err != nil {
		return db.User{}, fmt.Errorf("get new user: %s", err)
	}

	return newUser, nil
}

func (s *usersService) DeleteUser(ctx context.Context, uid string) error {
	if err := s.db.DeleteUser(ctx, uid); err != nil {
		return fmt.Errorf("delete an user: %s", err)
	}

	return nil
}
