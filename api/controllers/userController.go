package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
)

var RegisterUser = func(srv services.IUserService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := m.User{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
			return
		}
		err = json.Unmarshal(body, &user)

	}
}
