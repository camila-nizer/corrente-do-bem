package types

import (
	"time"

	"github.com/google/uuid"
)

// LoginDTO defined the /login payload
type LoginDTO struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"password"`
	Usertype string `json:"userType" validate:"required"`
}

// CreateUserDTO defined the /login payload
type CreateUserDTO struct {
	LoginDTO
	Name     string    `json:"name" validate:"required,min=3"`
	CNPJ     string    `json:"cnpj" validate:"required"`
	Industry []string  `json:"industry" validate:"required"`
	Status   StatusDTO `json:"status"`
}

type StatusDTO struct {
	status string
}
type UpdateUserDTO struct {
	LoginDTO
	ID          string   `json:"id" validate:"required"`
	Name        string   `json:"name"`
	CNPJ        string   `json:"cnpj" `
	Usertype    string   `json:"userType"`
	Industry    []string `json:"industry"`
	NewPassword string   `json:"newpassword"`
}

type UserResponse struct {
	ID         uuid.UUID            `json:"id"`
	Name       string               `json:"name"`
	CNPJ       string               `json:"cnpj"`
	Email      string               `json:"email"`
	Industry   []string             `json:"industry"`
	Usertype   string               `json:"userType"`
	UserStatus []UserStatusResponse `json:"userStatuses"`
}

type UserStatusResponse struct {
	ID        uuid.UUID `json:"statusId"`
	UserID    uuid.UUID `json:"-"`
	Status    string    `json:"userStatus"`
	CreatedAt time.Time `json:"createdAt"`
}

// AccessResponse todo
type AccessResponse struct {
	Token string `json:"token"`
}

// AuthResponse todo
type AuthResponse struct {
	User *UserResponse   `json:"user"`
	Auth *AccessResponse `json:"auth"`
}

// TokenPayload defines the payload for the token
type TokenPayload struct {
	ID       uuid.UUID `json:"id"`
	Email    string    `json:"email"`
	CNPJ     string    `json:"cnpj"`
	Name     string    `json:"name"`
	Industry []string  `json:"industry"`
	Usertype string    `json:"userType"`
}
