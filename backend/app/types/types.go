package types

import "time"

// MsgResponse defined the message payload
type MsgResponse struct {
	Message string `json:"message"`
}

type HealthCheckResponse struct {
	AppName   string    `json:"app"`
	Message   string    `json:"msg"`
	TimeUTC   time.Time `json:"timeUtc"`
	Timestamp int64     `json:"timestamp"`
}
