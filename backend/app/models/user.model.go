package models

import (
	"github.com/google/uuid"
)

// TODO: User in Identity Service (Keycloak)
// extracting token from HTTP requests.
// https://mikebolshakov.medium.com/keycloak-with-go-web-services-why-not-f806c0bc820a
// https://github.com/XenitAB/go-oidc-middleware

// User struct defines the user

type User struct {
	ID       uuid.UUID    `gorm:"type:uuid;default:uuid_generate_v4()"`
	Name     string       `gorm:"not null"`
	Email    string       `gorm:"unique;not null"`
	CNPJ     string       `gorm:"not null"`
	UserType UserTypeEnum `gorm:"not null"`
	Password string       `gorm:"not null"`
	Industry []string     `gorm:"type:jsonb"`
	Statuses []UserStatus `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UserTypeEnum string

const (
	UserAdmin UserTypeEnum = "Admin"
	UserOng   UserTypeEnum = "ONG"
)
