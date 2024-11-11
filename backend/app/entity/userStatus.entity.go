package entity

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
	ID        uuid.UUID
	UserID    uuid.UUID
	Status    UserStatusEnum
	CreatedAt time.Time
}
