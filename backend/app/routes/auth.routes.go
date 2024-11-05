package routes

import (
	"carona-solidaria/app/controllers"

	"github.com/gofiber/fiber/v2"
)

// AuthRoutes containes all the auth routes
func AuthRoutes(app fiber.Router) {
	r := app.Group("/auth")

	r.Post("/signup", controllers.SignupController)
	r.Post("/login", controllers.LoginController)
	r.Get("/user/:id", controllers.GetUserInfo)
}
