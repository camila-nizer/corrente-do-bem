package services

import (
	"carona-solidaria/app/interfaces"
	"carona-solidaria/app/repository"
	"carona-solidaria/config/database"
)

func InitUserServices() interfaces.UserServices {
	userRepo := repository.NewUserRepository(database.DB)
	userServices := NewUserServices(userRepo)

	return userServices
}

//TODO Status Services
// func InitUserStatusServices() interfaces.UserStatusServices {
// 	userStatusRepo := repository.NewUserStatusRepository(database.DB)
// 	userStatusServices := NewUserStatusService(userStatusRepo)

// 	return userStatusServices
// }
