package controllers

import (
	"context"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"nfc-api/database"
	m "nfc-api/models"
	"nfc-api/services"
	"strings"
	"testing"
)

func init() {
	conf := m.MongoConfiguration{
		Server:   mongoTestHost,
		Database: mongoTestDB,
	}
	ctx := context.TODO()

	db := database.ConnectDB(ctx, conf)
	db.Drop(ctx)
	userCollection := db.Collection("Users")

	userService = &services.UserService{
		Col: userCollection,
		Ctx: ctx,
	}
}

func TestUserControllers(t *testing.T) {
	id := "abcdefg123"
	username := "John Doe"
	password := "strongPassword123"
	email := "j.doe@somedomain.com"

	type Response struct {
		Payload   map[string]interface{} `json:"payload"`
		ErrorCode *int                   `json:"error_code,omitempty"`
	}

	t.Run("should register user", func(t *testing.T) {
		bytes, _ := json.Marshal(map[string]interface{}{"id": id, "username": username, "password": password, "email": email})
		req, _ := http.NewRequest("POST", "/register", strings.NewReader(string(bytes)))
		recorder := httptest.NewRecorder()
		h := http.HandlerFunc(RegisterUser(userService))
		h.ServeHTTP(recorder, req)

		resp := Response{}
		_ = json.Unmarshal([]byte(recorder.Body.String()), &resp)
		assert.NotNil(t, resp.Payload)
		assert.Equal(t, http.StatusCreated, recorder.Code)
		assert.Equal(t, username, resp.Payload["username"])
		assert.Equal(t, email, resp.Payload["email"])
		assert.Equal(t, false, resp.Payload["confirmed"])
		assert.Nil(t, resp.Payload["password"])
		assert.NotEqual(t, id, resp.Payload["id"])
	})
	t.Run("should authenticate user", func(t *testing.T) {
		bytes, _ := json.Marshal(map[string]interface{}{"password": password, "email": email})
		req, _ := http.NewRequest("POST", "/authenticate", strings.NewReader(string(bytes)))
		recorder := httptest.NewRecorder()
		h := http.HandlerFunc(AuthenticateUser(userService))
		h.ServeHTTP(recorder, req)

		resp := Response{}
		_ = json.Unmarshal([]byte(recorder.Body.String()), &resp)
		assert.NotNil(t, resp.Payload)
		assert.Equal(t, http.StatusOK, recorder.Code)
		assert.NotEmpty(t, resp.Payload["token"])
		assert.Contains(t, resp.Payload["token"], "eyJhb")
	})

}
