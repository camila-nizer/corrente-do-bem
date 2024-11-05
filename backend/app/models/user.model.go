package models

import (
	"github.com/google/uuid"

	"gorm.io/gorm"
)

// TODO: User in Identity Service (Keycloak)
// extracting token from HTTP requests.
// https://mikebolshakov.medium.com/keycloak-with-go-web-services-why-not-f806c0bc820a
// https://github.com/XenitAB/go-oidc-middleware

// User struct defines the user
type UserModel struct {
	gorm.Model
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	FirstName string    `gorm:"not null"`
	LastName  string    `gorm:"not null"`
	Email     string    `gorm:"unique;not null"`
	Password  string    `gorm:"not null"`
}
