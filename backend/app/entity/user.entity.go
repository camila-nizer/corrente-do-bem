package entity

import (
	"carona-solidaria/app/types"
	"carona-solidaria/utils"
	"carona-solidaria/utils/password"
	"encoding/json"
	"regexp"
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

// extracting token from HTTP requests.
// https://mikebolshakov.medium.com/keycloak-with-go-web-services-why-not-f806c0bc820a
// https://github.com/XenitAB/go-oidc-middleware

// User struct defines the user

type UserTypeEnum string

const (
	UserAdmin UserTypeEnum = "Admin"
	UserOng   UserTypeEnum = "ONG"
)

type User struct {
	ID       uuid.UUID
	Name     string
	Email    string
	CNPJ     string
	UserType UserTypeEnum
	Password string
	Industry datatypes.JSON `gorm:"type:jsonb"`
	Statuses []UserStatus
}

// New cria uma nova instância de UserModel a partir de um UserDTO
func (User) New(dto types.CreateUserDTO) (*User, error) {

	hash, err := password.Generate(dto.Password)

	if err != nil {
		return nil, utils.ErrHashPassword
	}

	if !isValidCNPJ(dto.CNPJ) {
		return nil, utils.ErrInvalidCNPJ
	}

	if len(dto.Industry) < 1 {
		return nil, utils.ErrEmptyIndustry
	}

	UT := UserTypeEnum(dto.Usertype)

	if UT != UserAdmin && UT != UserOng {
		return nil, utils.ErrInvalidUserType
	}
	industry, err := json.Marshal(dto.Industry)
	if err != nil {
		return nil, err
	}

	user := &User{
		ID:       uuid.New(), // Gera um novo UUID para o ID do usuário
		Name:     dto.Name,
		Email:    dto.Email,
		CNPJ:     dto.CNPJ,
		UserType: UT,
		Password: hash, // Hash da senha
		Industry: industry,
	}
	statusDraft := &UserStatus{
		ID:        uuid.New(),
		UserID:    user.ID,
		Status:    UserDraft,
		CreatedAt: time.Now(),
	}
	user.Statuses = append(user.Statuses, *statusDraft)
	return user, nil
}

func isValidCNPJ(cnpj string) bool {
	// Define a expressão regular para o CNPJ
	re := regexp.MustCompile(`^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$`)
	return re.MatchString(cnpj)
}
