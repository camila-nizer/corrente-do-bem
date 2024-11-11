package models

import (
	"time"

	"github.com/google/uuid"
)

type UserStatusEnum string

const (
	UserDraft     UserStatusEnum = "draft"
	UserPending   UserStatusEnum = "pending"
	UserActivated UserStatusEnum = "active"
	UserSuspended UserStatusEnum = "suspended"
	UserDeleted   UserStatusEnum = "deleted"
)

type UserStatus struct {
	ID        uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()"`
	UserID    uuid.UUID      `gorm:"type:uuid;not null"`
	Status    UserStatusEnum `gorm:"not null"`
	CreatedAt time.Time      `gorm:"not null"`
	User      User           `gorm:"foreignKey:UserID"`
}
