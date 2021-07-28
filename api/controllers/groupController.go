package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"io/ioutil"
	"log"
	"net/http"
	cmn "nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
	"strconv"
	"time"
)

var FindGroups = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		filter := bson.M{}
		q := r.URL.Query().Get("q")
		page, err := strconv.Atoi(r.URL.Query().Get("p"))
		if err != nil || page < 0 {
			page = 0
		}
		size, err := strconv.Atoi(r.URL.Query().Get("s"))
		if err != nil || size < 0 || size > 50 {
			size = 10
		}

		if q != "" {
			err := json.Unmarshal([]byte(q), &filter)
			if err != nil {
				log.Println("FindGroups()", err.Error())
				cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
				return
			}
		}
		cp := r.Context().Value(0).(cmn.ContextPayload)
		userId, err := primitive.ObjectIDFromHex(cp.Get("user"))
		if err != nil {
			log.Println("FindGroups()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		filter["userId"] = userId
		res, total, err := srv.Find(filter, int64(page*size), int64(size))
		if err != nil {
			log.Println("FindGroups()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, cmn.PaginateData(res, page, size, total), http.StatusOK, nil)
	}
}

var GetGroup = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]
		res, err := srv.Get(id)
		if err != nil {
			log.Println("GetGroup()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusOK, nil)
	}
}

var CreateGroup = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		group := m.Group{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Println("CreateGroup()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		err = json.Unmarshal(body, &group)
		if err != nil {
			log.Println("CreateGroup()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cp := r.Context().Value(0).(cmn.ContextPayload)
		userId, err := primitive.ObjectIDFromHex(cp.Get("user"))
		if err != nil {
			log.Println("CreateGroup()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &cmn.ErrorInvalidRequest)
			return
		}
		// reset ID field
		group.ID = nil
		group.CreatedAt = time.Now()
		group.UpdatedAt = time.Now()
		// grab UserId from the context and use it as the owner
		group.UserID = &userId
		err, code := group.Validate()
		if err != nil {
			log.Println("CreateGroup()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, &code)
			return
		}
		res, err := srv.Insert(group)
		if err != nil {
			log.Println("CreateGroup()", err.Error())
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusCreated, nil)
	}
}

var PatchGroup = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		var post interface{}
		err = json.Unmarshal(body, &post)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		res, err := srv.Update(id, post)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusOK, nil)
	}
}

var DeleteGroup = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]
		res, err := srv.Delete(id)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusOK, nil)
	}
}
