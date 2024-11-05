package services

import (
	"carona-solidaria/app/entity"
	"carona-solidaria/app/interfaces"
	"carona-solidaria/app/types"
	"carona-solidaria/utils/password"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type userServices struct {
	repo interfaces.UserRepository
}

func NewUserServices(repo interfaces.UserRepository) interfaces.UserServices {
	return &userServices{repo}
}

func (u *userServices) Create(b *types.CreateUserDTO) (*entity.User, error) {

	hash, err := password.Generate(b.Password)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create a password Hash")
	}

	draftUser := &entity.User{
		Name:     b.Name,
		CNPJ:     b.CNPJ,
		Industry: b.Industry,
		Usertype: entity.UserTypeEnum(b.Usertype),
		Email:    strings.ToLower(b.Email),
		Password: hash,
	}
	status := &entity.UserStatus{
		Status:    entity.UserDraft,
		CreatedAt: time.Now(),
	}

	// Create a user, if error return
	user, err := u.repo.Create(draftUser, status)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusConflict, err.Error())
	}

	return user, nil

}

func (u *userServices) UpdateUser(b *types.UpdateUserDTO) (*entity.User, error) {
	userID, _ := uuid.Parse(b.ID)
	_, err := u.repo.FindUserByID(userID)
	if err != nil {
		return nil, err
	}

	hash, err := password.Generate(b.Password)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create a password Hash")
	}
	//TODO FAZER A LÓGICA PARA ENVIAR APENAS O QUE FOI EDITADO
	draftUser := &entity.User{
		Name:     b.Name,
		CNPJ:     b.CNPJ,
		Industry: b.Industry,
		Usertype: entity.UserTypeEnum(b.Usertype),
		Email:    strings.ToLower(b.Email),
		Password: hash,
	}

	err = u.repo.UpdateUser(userID, draftUser)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update User")
	}

	updatedUser, err := u.repo.FindUserByID(userID)
	if err != nil {
		return nil, err
	}

	return updatedUser, nil

}

func (u *userServices) FindUserByID(id uuid.UUID) (*entity.User, error) {
	user, err := u.repo.FindUserByID(id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userServices) FindUserByEmail(email string) (*entity.User, error) {

	user, err := u.repo.FindUserByEmail(email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userServices) FindActiveUsers() ([]*entity.User, error) {

	users, err := u.repo.FindActiveUsers()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *userServices) FindAllUsers() ([]*entity.User, error) {

	users, err := u.repo.FindAllUsers()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *userServices) FindUsersByLastStatus(status string) ([]*entity.User, error) {

	users, err := u.repo.FindUsersByLastStatus(status)
	if err != nil {
		return nil, err
	}

	return users, nil
}
