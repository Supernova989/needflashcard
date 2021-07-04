package controllers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
)

var AuthenticateUser = func(srv services.IUserService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Requesting Authentication endpoint [%s]", "" )
		user := m.User{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
			return
		}
		err = json.Unmarshal(body, &user)

	}
}
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
