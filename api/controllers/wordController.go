package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"io/ioutil"
	"log"
	"net/http"
	cmn "nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
	"time"
)

var CreateWord = func(srv services.IWordService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		word := m.Word{}
		params := mux.Vars(r)
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		err = json.Unmarshal(body, &word)
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cp := r.Context().Value(0).(cmn.ContextPayload)
		userId, err := primitive.ObjectIDFromHex(cp.Get("user"))
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		groupId, err := primitive.ObjectIDFromHex(params["id"])
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		// reset ID field
		word.ID = nil
		for _, w := range word.Examples {
			w.ID = nil
		}
		word.CreatedAt = time.Now()
		word.GroupID = &groupId

		err, code := word.Validate()
		if err != nil {
			log.Println(err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &code)
			return
		}
		res, err := srv.Insert(word, userId)
		if err != nil {
			log.Printf("Cannot create new word (%s)", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusCreated, nil)
	}
}
