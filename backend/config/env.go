package config

import (
	"fmt"
	"os"
)

var (
	APPVERSION = getEnv("APPVERSION", "v0.0.0-UNDEFINED")
	// DB returns the name of the sqlite database
	DB = getEnv("DB", "host=db user=postgres password=camila dbname=corrente-do-bem port=5432 sslmode=disable TimeZone=America/Sao_Paulo")
	// PORT returns the server listening port
	PORT = getEnv("PORT", "3000")
	// TOKENKEY returns the jwt token secret
	TOKENKEY = getEnv("TOKEN_KEY", "")
	// TOKENEXP returns the jwt token expiration duration.
	// Should be time.ParseDuration string. Source: https://golang.org/pkg/time/#ParseDuration
	// default: 10h
	TOKENEXP = getEnv("TOKEN_EXP", "10h")
)

func getEnv(name string, fallback string) string {
	if value, exists := os.LookupEnv(name); exists {
		return value
	}

	if fallback != "" {
		return fallback
	}

	panic(fmt.Sprintf(`Environment variable not found :: %v`, name))
}
