package interfaces

import (
	"carona-solidaria/app/entity"
	"carona-solidaria/app/types"

	"github.com/google/uuid"
)

type UserRepository interface {
	Create(*entity.User, *entity.UserStatus) (*entity.User, error)
	UpdateUser(uuid.UUID, interface{}) error
	FindAllUsers() ([]*entity.User, error)
	FindActiveUsers() ([]*entity.User, error)
	FindUserByID(uuid.UUID) (*entity.User, error)
	FindUserByEmail(string) (*entity.User, error)
	FindUsersByLastStatus(status string) ([]*entity.User, error)
}

type UserServices interface {
	Create(*types.CreateUserDTO) (*entity.User, error)
	UpdateUser(*types.UpdateUserDTO) (*entity.User, error)
	FindAllUsers() ([]*entity.User, error)
	FindActiveUsers() ([]*entity.User, error)
	FindUserByID(uuid.UUID) (*entity.User, error)
	FindUserByEmail(string) (*entity.User, error)
	FindUsersByLastStatus(status string) ([]*entity.User, error)
}
