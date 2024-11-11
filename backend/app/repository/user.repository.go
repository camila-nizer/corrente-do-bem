package repository

import (
	"carona-solidaria/app/entity"
	"carona-solidaria/app/interfaces"
	"carona-solidaria/utils"
	"errors"
	"strings"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) interfaces.UserRepository {
	return &userRepository{db}
}

func (u *userRepository) Create(user *entity.User) (*entity.User, error) {
	_, err := u.FindUserByEmail(strings.ToLower(user.Email))
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, utils.ErrEmailAlreadyExists
	}
	tx := u.db.Begin()
	if tx.Error != nil {
		return nil, tx.Error
	}
	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	// if err := tx.Create(&status).Error; err != nil {
	// 	tx.Rollback()
	// 	return nil, err
	// }
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}
	return user, nil
}

// FindUser searches the user's table with the condition given
func (u *userRepository) FindUserByID(id uuid.UUID) (*entity.User, error) {
	var user entity.User
	err := u.db.Preload("Statuses", func(db *gorm.DB) *gorm.DB {
		return db.Order("user_statuses.created_at ASC")
	}).First(&user, "id = ?", id).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// FindUserByEmail searches the user's table with the email given
func (u *userRepository) FindUserByEmail(email string) (*entity.User, error) {
	var user entity.User
	err := u.db.Preload("Statuses", func(db *gorm.DB) *gorm.DB {
		return db.Order("user_statuses.created_at ASC")
	}).First(&user, gorm.Expr("LOWER(email) = LOWER(?)", email)).Error //olhar se a letra minuscula funciona
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// FindActiveUsers searches all the user's actives
func (u *userRepository) FindActiveUsers() ([]*entity.User, error) {
	var response []*entity.User
	users, err := u.FindAllUsers()
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		//if len(user.Status) == 0 it does not generate panic
		if len(user.Statuses) >= 1 && user.Statuses != nil {
			lastStatus := user.Statuses[len(user.Statuses)-1].Status
			if lastStatus != entity.UserStatusEnum("suspended") && lastStatus != entity.UserStatusEnum("deleted") {
				response = append(response, user)
				break
			}
		}
	}
	return response, nil
}

// FindAllUsers searches all the user's
func (u *userRepository) FindAllUsers() ([]*entity.User, error) {
	var users []*entity.User
	err := u.db.Preload("Statuses", func(db *gorm.DB) *gorm.DB {
		return db.Order("user_statuses.created_at ASC")
	}).Error //olhar se a letra minuscula funciona
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (u *userRepository) FindUsersByLastStatus(status string) ([]*entity.User, error) {
	var response []*entity.User
	users, err := u.FindAllUsers()
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		//if len(user.Status) == 0 it does not generate panic
		if len(user.Statuses) >= 1 && user.Statuses != nil {
			lastStatus := user.Statuses[len(user.Statuses)-1].Status
			if lastStatus == entity.UserStatusEnum("deleted") {
				response = append(response, user)
				break
			}
		}
	}
	return response, nil
}

func (u *userRepository) UpdateUser(id uuid.UUID, updates interface{}) error {
	result := u.db.Where("id = ?", id).Updates(updates)
	return result.Error
}

//isso aqui para as campanhas

// func (r *CampaignsRepository) FindActive() ([]*entity.Campaigns, error) {
// 	var campaign, response []*entity.Campaign
// 	err := r.db.Preload("Statuses", func(db *gorm.DB) *gorm.DB {
// 		return db.Order("campaign_statuses.created_at ASC")
// 	}).Preload("Options").Find(&campaigns).Error
// 	if err != nil {
// 		return nil, err
// 	}

// 	for _, c := range campaign {
// 		//if len(c.Status) == 0 it does not generate panic
// 		if len(c.Status) >= 1 && p.Status != nil {
// 			lastStatus := c.Status[len(c.Status)-1].Status
// 			for _, timeslot := range c.TimeSlots {
// 				if (lastStatus == "approved" && timeslot.EndTime.After(time.Now())) || (lastStatus == "on_air" && timeslot.EndTime.After(time.Now())) {
// 					response = append(response, c)
// 					break
// 				}
// 			}
// 		}
// 	}

// 	return response, nil
// }
