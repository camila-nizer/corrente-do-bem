package entity

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"gorm.io/gorm"
)

// extracting token from HTTP requests.
// https://mikebolshakov.medium.com/keycloak-with-go-web-services-why-not-f806c0bc820a
// https://github.com/XenitAB/go-oidc-middleware

// User struct defines the user
type User struct {
	gorm.Model
	ID       uuid.UUID    `gorm:"type:uuid;default:uuid_generate_v4()"`
	Name     string       `gorm:"not null"`
	CNPJ     string       `gorm:"not null"`
	Email    string       `gorm:"unique;not null"`
	Industry []string     `gorm:"not null"`
	Usertype UserTypeEnum `gorm:"not null"`
	Password string       `gorm:"not null"`
	Status   []UserStatus `gorm:"not null"`
}

var (
	errStatusDraft = errors.New("create/delete/update draft status is not allowed")
)

type UserStatusEnum string

const (
	UserDraft     UserStatusEnum = "draft"
	UserPending   UserStatusEnum = "pending"
	UserActivated UserStatusEnum = "active"
	UserSuspended UserStatusEnum = "suspended"
	UserDeleted   UserStatusEnum = "deleted"
)

type UserTypeEnum string

const (
	UserAdmin UserTypeEnum = "Admin"
	UserOng   UserTypeEnum = "ONG"
)

type UserStatus struct {
	ID        uuid.UUID
	UserID    uuid.UUID
	Status    UserStatusEnum
	CreatedAt time.Time
}
