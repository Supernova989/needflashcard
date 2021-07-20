package controllers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	cmn "nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
)

var AuthenticateUser = func(srv services.IUserService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Requesting authentication endpoint [%s]", r.RequestURI)
		cred := m.AuthenticationRequest{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		err = json.Unmarshal(body, &cred)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		err, code, token, user := srv.Authenticate(cred.Email, cred.Password)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &code)
			return
		}
		log.Printf("User %s [%s] logs in", user.Username, user.ID)
		result := make(map[string]interface{}, 0)
		result["token"] = token
		cmn.WriteJsonResponse(w, result, http.StatusOK, nil)
	}
}

var RegisterUser = func(srv services.IUserService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Requesting registration endpoint [%s]", r.RequestURI)
		user := m.User{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		err = json.Unmarshal(body, &user)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		// reset fields
		user.Confirmed = false
		user.ID = nil

		err, code := user.Validate()
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &code)
			return
		}
		//check if email is already used
		exists, err := srv.CheckIfExists(user.Email, user.Username)
		if exists || err != nil {
			log.Printf("username [%s] or email [%s] are already in use", user.Username, user.Email)
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorUserExists)
			return
		}

		result, err := srv.Insert(user)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &code)
			return
		}
		cmn.WriteJsonResponse(w, result, http.StatusCreated, nil)
	}
}
