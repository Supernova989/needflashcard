package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"nfc-api/database"
	m "nfc-api/models"
	"nfc-api/services"
	"strings"
	"testing"
)

type HashMap map[string]interface{}

var service services.IPostService

const testServer = "mongodb://localhost:27017"
const testDB = "Gmd_db"
const testCollection = "Posts_test"

func init() {
	conf := m.MongoConfiguration{
		Server:   testServer,
		Database: testDB,
	}
	ctx := context.TODO()

	db := database.ConnectDB(ctx, conf)
	collection := db.Collection(testCollection)

	service = &services.PostService{
		Col: collection,
		Ctx: ctx,
	}
}

func TestCreatePost(t *testing.T) {
	title := "Test title"
	body := "Test body"

	tests := map[string]struct {
		payload       string
		expectedCode  int
		expectedTitle string
		expectedBody  string
	}{
		"should return 201": {
			payload:       fmt.Sprintf("{\"userId\":1,\"title\":\"%s\",\"body\":\"%s\"}", title, body),
			expectedCode:  http.StatusCreated,
			expectedTitle: title,
			expectedBody:  body,
		},
	}

	for name, test := range tests {
		t.Run(name, func(t *testing.T) {
			req, _ := http.NewRequest("POST", "/posts", strings.NewReader(test.payload))
			recorder := httptest.NewRecorder()
			h := http.HandlerFunc(CreatePost(service))
			h.ServeHTTP(recorder, req)

			resp := m.JsonResponse{}
			_ = json.Unmarshal([]byte(recorder.Body.String()), &resp)
			assert.NotNil(t, resp.Payload)

			if test.expectedCode == http.StatusCreated && resp.Payload != nil {
				assert.Equal(t, test.expectedBody, resp.Payload.(HashMap)["body"])
				assert.Equal(t, test.expectedTitle, resp.Payload.(HashMap)["title"])
				assert.NotNil(t, resp.Payload.(HashMap)["id"])
				_, _ = service.Delete(resp.Payload.(HashMap)["id"].(string))
			}
			assert.Equal(t, test.expectedCode, recorder.Code)
		})
	}
}
