package controllers

import (
	"carona-solidaria/app/entity"
	"carona-solidaria/app/services"
	"carona-solidaria/app/types"
	"carona-solidaria/utils"
	"carona-solidaria/utils/jwt"
	"carona-solidaria/utils/password"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

var (
	ErrEmptyIndustry = errors.New("Você precisa ter ao menos uma industria selecionada.")
)

func GenerateToken(user *entity.User) (*types.AuthResponse, error) {
	// generate access token
	token, err := jwt.Generate(&types.TokenPayload{
		ID:       user.ID,
		Name:     user.Name,
		Email:    user.Email,
		CNPJ:     user.CNPJ,
		Industry: user.Industry,
		Usertype: string(user.Usertype),
	})
	if err != nil {
		return nil, err
	}

	response := &types.AuthResponse{
		User: &types.UserResponse{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
		},
		Auth: &types.AccessResponse{
			Token: token,
		},
	}
	return response, nil
}

func CreateUserResponse(user *entity.User) *types.UserResponse {
	userStatus := []types.UserStatusResponse{}
	for _, status := range user.Status {
		status := types.UserStatusResponse{
			ID:        status.ID,
			UserID:    status.UserID,
			Status:    string(status.Status),
			CreatedAt: status.CreatedAt,
		}
		userStatus = append(userStatus, status)
	}
	resp := &types.UserResponse{
		ID:         user.ID,
		Name:       user.Name,
		CNPJ:       user.CNPJ,
		Usertype:   string(user.Usertype),
		Industry:   user.Industry,
		UserStatus: userStatus,
	}
	return resp
}

// SignupController service creates a user
func SignupController(ctx *fiber.Ctx) error {
	b := new(types.CreateUserDTO)
	services := services.InitUserServices()

	if err := utils.ParseBodyAndValidate(ctx, b); err != nil {
		return fiber.NewError(fiber.StatusConflict, err.Error())
	}
	if len(b.Industry) < 1 && b.Usertype != "Admin" {
		return fiber.NewError(fiber.ErrBadGateway.Code, ErrEmptyIndustry.Error())
	}

	user, err := services.Create(b)
	if err != nil {
		return err
	}
	resp, err := GenerateToken(user)
	if err != nil {
		return err
	}
	return ctx.JSON(resp)
}

func EditUser(ctx *fiber.Ctx) error {

	b := new(types.UpdateUserDTO)
	services := services.InitUserServices()

	if err := utils.ParseBodyAndValidate(ctx, b); err != nil {
		return fiber.NewError(fiber.StatusConflict, err.Error())
	}
	if len(b.Industry) < 1 && b.Usertype != "Admin" {
		return fiber.NewError(fiber.ErrBadGateway.Code, ErrEmptyIndustry.Error())
	}

	user, err := services.UpdateUser(b)
	if err != nil {
		return err
	}
	return ctx.JSON(user)

}

// LoginController service logs in a user
func LoginController(ctx *fiber.Ctx) error {
	b := new(types.LoginDTO)
	services := services.InitUserServices()
	if err := utils.ParseBodyAndValidate(ctx, b); err != nil {
		return err
	}

	user, err := services.FindUserByEmail(b.Email)
	if err != nil {
		return err
	}

	if err := password.Verify(user.Password, b.Password); err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, err.Error())
	}

	resp, err := GenerateToken(user)
	if err != nil {
		return err
	}
	return ctx.JSON(resp)
}

func GetUserInfo(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	services := services.InitUserServices()
	userID, valid := uuid.Parse(id)
	if valid != nil {
		fiber.NewError(fiber.ErrBadRequest.Code, "invalid user ID")
	}

	user, err := services.FindUserByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fiber.NewError(fiber.StatusNotFound, err.Error())
		}

		return err
	}

	userResponse := CreateUserResponse(user)

	return ctx.JSON(userResponse)
}

func FindUserByEmail(ctx *fiber.Ctx) error {
	email := ctx.Params("email")
	services := services.InitUserServices()

	user, err := services.FindUserByEmail(email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fiber.NewError(fiber.StatusNotFound, err.Error())
		}
		return err
	}

	userResponse := CreateUserResponse(user)

	return ctx.JSON(userResponse)
}

func FindActiveUsers(ctx *fiber.Ctx) error {
	services := services.InitUserServices()

	users, err := services.FindActiveUsers()
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fiber.NewError(fiber.StatusNotFound, err.Error())
		}
		return err
	}
	usersRespose := []types.UserResponse{}
	for _, user := range users {

		userResp := CreateUserResponse(user)
		usersRespose = append(usersRespose, *userResp)
	}

	return ctx.JSON(usersRespose)
}

func FindAllUsers(ctx *fiber.Ctx) error {
	services := services.InitUserServices()

	users, err := services.FindAllUsers()
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fiber.NewError(fiber.StatusNotFound, err.Error())
		}
		return err
	}
	usersRespose := []types.UserResponse{}
	for _, user := range users {

		userResp := CreateUserResponse(user)
		usersRespose = append(usersRespose, *userResp)
	}

	return ctx.JSON(usersRespose)
}
