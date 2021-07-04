package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"nfc-api/common"
	"nfc-api/database"
	m "nfc-api/models"
	"nfc-api/services"
	"strings"
	"testing"
)

var userService services.IUserService

func init() {
	conf := m.MongoConfiguration{
		Server:   "mongodb://localhost:27017",
		Database: "Nfc_db_test",
	}
	ctx := context.TODO()

	db := database.ConnectDB(ctx, conf)
	collection := db.Collection("Users")

	userService = &services.UserService{
		Col: collection,
		Ctx: ctx,
	}
}

func TestCreateUser(t *testing.T) {
	id := "abcdefg123"
	username := "John Doe"
	password := "strongPassword123"
	email := "j.doe@somedomain.com"

	tests := map[string]struct {
		payload           string
		expectedCode      int
		expectedUsername  string
		expectedEmail     string
		expectedPassword  *string
		expectedConfirmed bool
	}{
		"should return 201 and a proper payload": {
			payload:           fmt.Sprintf("{\"id\":\"%s\",\"username\":\"%s\",\"password\":\"%s\",\"email\":\"%s\"}", id, username, password, email),
			expectedCode:      http.StatusCreated,
			expectedUsername:  username,
			expectedEmail:     email,
			expectedPassword:  nil,
			expectedConfirmed: false,
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			req, _ := http.NewRequest("POST", "/register", strings.NewReader(test.payload))
			recorder := httptest.NewRecorder()
			h := http.HandlerFunc(RegisterUser(userService))
			h.ServeHTTP(recorder, req)

			resp := common.JsonResponse{}
			_ = json.Unmarshal([]byte(recorder.Body.String()), &resp)
			assert.NotNil(t, resp.Payload)

			if test.expectedCode == http.StatusCreated && resp.Payload != nil {
				assert.Equal(t, test.expectedUsername, resp.Payload.(map[string]interface{})["username"])
				assert.Equal(t, test.expectedEmail, resp.Payload.(map[string]interface{})["email"])
				assert.Equal(t, test.expectedConfirmed, resp.Payload.(map[string]interface{})["confirmed"])
				assert.Equal(t, test.expectedPassword, resp.Payload.(map[string]interface{})["password"])
				assert.NotEqual(t, id, resp.Payload.(map[string]interface{})["id"])
				_, _ = userService.Delete(resp.Payload.(map[string]interface{})["id"].(string))
			}
			assert.Equal(t, test.expectedCode, recorder.Code)
		})
	}
}
