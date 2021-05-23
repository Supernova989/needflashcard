package controllers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
	"io/ioutil"
	"net/http"
)

var FindPosts = func(srv services.IPostService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var filter interface{}
		q := r.URL.Query().Get("q")
		if q != "" {
			err := json.Unmarshal([]byte(q), &filter)
			if err != nil {
				common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
				return
			}
		}
		res, err := srv.Find(filter)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, err.Error())
			return
		}
		common.WriteJsonResponse(w, res, http.StatusOK, nil, "")
	}
}

var GetPost = func(srv services.IPostService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]
		res, err := srv.Get(id)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, err.Error())
			return
		}
		common.WriteJsonResponse(w, res, http.StatusOK, nil, "")
	}
}

var CreatePost = func(srv services.IPostService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		post := m.Post{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
			return
		}
		err = json.Unmarshal(body, &post)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
			return
		}
		res, err := srv.Insert(post)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, err.Error())
			return
		}
		common.WriteJsonResponse(w, res, http.StatusCreated, nil, "")
	}
}

var PatchPost = func(srv services.IPostService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
			return
		}
		var post interface{}
		err = json.Unmarshal(body, &post)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, "")
			return
		}
		res, err := srv.Update(id, post)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, err.Error())
			return
		}
		common.WriteJsonResponse(w, res, http.StatusOK, nil, "")
	}
}

var DeletePost = func(srv services.IPostService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id := params["id"]
		res, err := srv.Delete(id)
		if err != nil {
			common.WriteJsonResponse(w, nil, http.StatusBadRequest, nil, err.Error())
			return
		}
		common.WriteJsonResponse(w, res, http.StatusOK, nil, "")
	}
}
