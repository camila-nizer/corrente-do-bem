package main

import (
	"carona-solidaria/app/models"
	"carona-solidaria/app/types"
	"carona-solidaria/config/database"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

const (
	AppName string = "corrente do bem"
)

func main() {
	database.Connect()
	database.Migrate(
		&models.UserModel{},
	)
	//TODO: configurar errs.handler
	// app := fiber.New(fiber.Config{
	// 	ErrorHandler: utils.ErrorHandler,
	// })
	app := fiber.New()

	//app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "",
	}))

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(&types.HealthCheckResponse{
			AppName:   AppName,
			Message:   "Everything sounds good...",
			Timestamp: time.Now().UTC().Unix(),
			TimeUTC:   time.Now().UTC(),
		})
	})

	api := app.Group("/api") // /api

	v1 := api.Group("/v1", func(c *fiber.Ctx) error {
		c.Set("Z--AppName", AppName)
		c.Set("Z--APIVersion", "v1")
		return c.Next()
	})
	fmt.Println(v1)

	// routes.AuthRoutes(v1)
	// routes.CampaingsRoutes(v1)

	app.Listen(fmt.Sprintf(":%v", "3000"))

	fmt.Println("Hello, World!")
}
