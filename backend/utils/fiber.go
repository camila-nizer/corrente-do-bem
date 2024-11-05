package utils

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// ParseBody is helper function for parsing the body.
// Is any error occurs it will panic.
// Its just a helper function to avoid writing if condition again n again.
func ParseBody(ctx *fiber.Ctx, body interface{}) *fiber.Error {
	if err := ctx.BodyParser(body); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	return nil
}

func ParseQueryParams(ctx *fiber.Ctx, query interface{}) *fiber.Error {
	if err := ctx.QueryParser(query); err != nil {
		return fiber.ErrBadRequest
	}

	return nil
}

func ParseQueryParamsAndValidate(ctx *fiber.Ctx, query interface{}) *fiber.Error {
	if err := ParseQueryParams(ctx, query); err != nil {
		return err
	}

	return Validate(query)
}

// ParseBodyAndValidate is helper function for parsing the body.
// Is any error occurs it will panic.
// Its just a helper function to avoid writing if condition again n again.
func ParseBodyAndValidate(ctx *fiber.Ctx, body interface{}) *fiber.Error {
	if err := ParseBody(ctx, body); err != nil {
		return err
	}

	return Validate(body)
}

// GetUser is helper function for getting authenticated user's id
func GetUser(ctx *fiber.Ctx) *uuid.UUID {
	id, _ := ctx.Locals("USER").(uuid.UUID)
	return &id
}
