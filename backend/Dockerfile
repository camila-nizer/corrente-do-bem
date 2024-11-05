# Choose whatever you want, version >= 1.16
FROM golang:1.23

WORKDIR /app

RUN go install github.com/air-verse/air@latest && go install github.com/go-delve/delve/cmd/dlv@latest && go install github.com/joho/godotenv/cmd/godotenv@latest

COPY go.mod go.sum ./
RUN go mod download

CMD ["air", "-c", ".air.toml"]