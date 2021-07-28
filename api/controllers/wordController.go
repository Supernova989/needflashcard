package controllers

import (
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
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


var GetWord = func(srv services.IWordService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
var FindWords = func(srvW services.IWordService, srvG services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		q := r.URL.Query().Get("q")
		cp := r.Context().Value(0).(cmn.ContextPayload)
		userId, err := primitive.ObjectIDFromHex(cp.Get("user"))
		if err != nil {
			log.Println("FindWords()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}

		groups, _, err := srvG.Find(primitive.M{"userId": userId}, 0,9999)
		if err != nil {
			log.Println("FindWords()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		groupIds := make([]*primitive.ObjectID, 0)
		for _, g := range groups {
			groupIds = append(groupIds, g.ID)
		}
		filter := bson.D{
			{"groupId", bson.D{{"$in", groupIds}}},
			{"title", bson.D{{"$regex",q}, {"$options", "i"}}},
		}
		words, err := srvW.Find(filter)
		if err != nil {
			log.Println("FindWords()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		cmn.WriteJsonResponse(w, words, http.StatusOK, nil)
	}
}