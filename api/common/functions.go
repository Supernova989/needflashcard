package common

import (
	"encoding/json"
	"nfc-api/models"
	"net/http"
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
