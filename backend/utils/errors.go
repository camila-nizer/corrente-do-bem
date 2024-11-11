package utils

import "errors"

var (
	ErrEmptyIndustry      = errors.New("Você precisa ter ao menos uma industria selecionada.")
	ErrInvalidUserType    = errors.New("Invalid User type.")
	ErrHashPassword       = errors.New("Failed to create a password Hash.")
	ErrInvalidCNPJ        = errors.New("CNPJ inválido.")
	ErrEmailAlreadyExists = errors.New("email already exists")
	errStatusDraft        = errors.New("create/delete/update draft status is not allowed")
)
