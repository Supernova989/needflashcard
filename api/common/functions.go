package common

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strings"
)

type JsonResponse struct {
	Payload      interface{} `json:"payload"`
	ErrorCode    *int        `json:"error_code,omitempty"`
}

type ContextPayload struct {
	M map[string]string
}
func (c *ContextPayload) Get(key string) string {
	return c.M[key]
}
func WriteJsonResponse(w http.ResponseWriter, payload interface{}, status int, errorCode *int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	resp := &JsonResponse{}
	resp.ErrorCode = errorCode
	resp.Payload = payload
	json.NewEncoder(w).Encode(resp)
}

func Contains(slice []string, e string) bool {
	for _, a := range slice {
		if a == e {
			return true
		}
	}
	return false
}

func IsProduction() bool {
	return Contains(os.Args, "--production")
}

func ValidateEmail(email string) bool {
	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	if !re.MatchString(email) {
		return false
	}
	forbiddenChars := []string{"'", "\"", "#"}
	for _, char := range forbiddenChars {
		if strings.Contains(email, char) {
			return false
		}
	}
	for pos, _ := range email {
		ch := fmt.Sprintf("%c", email[pos])
		if pos > 0 && ch == "." && ch == fmt.Sprintf("%c", email[pos-1]) {
			return false
		}
	}
	return true
}