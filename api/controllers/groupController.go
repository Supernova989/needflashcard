package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	cmn "nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
)

var FindGroups = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var filter map[string]interface{}
		q := r.URL.Query().Get("q")
		if q != "" {
			err := json.Unmarshal([]byte(q), &filter)
			if err != nil {
				cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
				return
			}
		}
		cp := r.Context().Value(0).(cmn.ContextPayload)

		filter["userId"] = cp.Get("user")

		res, err := srv.Find(filter)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusOK, nil)
	}
}

var GetGroup = func(srv services.IGroupService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]
		res, err := srv.Get(id)
		if err != nil {
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
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		err = json.Unmarshal(body, &group)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cp := r.Context().Value(0).(cmn.ContextPayload)
		group.UserID = cp.Get("user")
		res, err := srv.Insert(group)
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusBadRequest, nil)
			return
		}
		cmn.WriteJsonResponse(w, res, http.StatusCreated, nil)
	}
}

var PatchPost = func(srv services.IGroupService) http.HandlerFunc {
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

var DeletePost = func(srv services.IGroupService) http.HandlerFunc {
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
