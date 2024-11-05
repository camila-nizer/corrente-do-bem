package jwt

import (
	"carona-solidaria/app/types"
	"carona-solidaria/config"
	"errors"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
)

var (
	ErrInvalidTimeDuration = errors.New("invalid time duration. Should be time.ParseDuration string")
	ErrGetSignedString     = errors.New("error getting complete and signed token")
)

// Generate generates the jwt token based on payload
func Generate(payload *types.TokenPayload) (string, error) {
	v, err := time.ParseDuration(config.TOKENEXP)

	if err != nil {
		return "", ErrInvalidTimeDuration
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp":     time.Now().Add(v).Unix(),
		"ID":      payload.ID,
		"payload": payload,
	})

	token, err := t.SignedString([]byte(config.TOKENKEY))

	if err != nil {
		return "", err
	}

	return token, nil
}

func parse(token string) (*jwt.Token, error) {
	// Parse takes the token string and a function for looking up the key. The latter is especially
	// useful if you use multiple keys for your application.  The standard is to use 'kid' in the
	// head of the token to identify which key to use, but the parsed token (head and claims) is provided
	// to the callback, providing flexibility.
	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(config.TOKENKEY), nil
	})
}

func ApiVerify(token string) (bool, error) {
	parsed, err := parse(token)

	if err != nil {
		return false, err
	}

	return parsed.Valid, nil
}

// Verify verifies the jwt token against the secret
func Verify(token string) (*types.TokenPayload, error) {
	parsed, err := parse(token)
	if err != nil {
		return nil, err
	}

	// Parsing token claims
	claims, ok := parsed.Claims.(jwt.MapClaims)
	if !ok {
		return nil, err
	}

	// Getting ID, it's an interface{} so I need to cast it to uuid
	strId, ok := claims["ID"].(string)
	if !ok {
		return nil, errors.New("something went wrong")
	}

	id, err := uuid.Parse(strId)
	if err != nil {
		return nil, errors.New("invalid user ID")
	}

	return &types.TokenPayload{
		ID: id,
	}, nil
}
