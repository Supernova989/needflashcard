package common

import (
	"encoding/json"
	"net/http"
	"nfc-api/models"
	"os"
)

func WriteJsonResponse(w http.ResponseWriter, payload interface{}, status int, errorCode *int, errorMessage string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	resp := &models.JsonResponse{}
	resp.ErrorCode = errorCode
	resp.ErrorMessage = errorMessage
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