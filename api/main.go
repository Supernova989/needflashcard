package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"nfc-api/config"
	"nfc-api/controllers"
	"nfc-api/database"
	mw "nfc-api/middleware"
	"nfc-api/services"
)

func main() {
	database.Initialize()

	userService := &services.UserService{
		Col: database.GetDB().Collection(config.GetConfig().Mongo.Collections.Users),
		Ctx: database.GetGlobalContext(),
	}

	groupService := &services.GroupService{
		Col: database.GetDB().Collection(config.GetConfig().Mongo.Collections.Groups),
		Ctx: database.GetGlobalContext(),
	}

	r := mux.NewRouter()
	//Common Middleware
	r.Use(mw.CorsMiddleware)
	r.Use(mw.XhrMiddleware)

	//Endpoints
	r.HandleFunc("/api/register", controllers.RegisterUser(userService)).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/authenticate", controllers.AuthenticateUser(userService)).Methods("POST", "OPTIONS")

	r.Handle("/api/v1/groups", mw.JwtAuthMiddleware(controllers.FindGroups(groupService), userService)).Methods("GET", "OPTIONS")
	r.Handle("/api/v1/groups/{id}", mw.JwtAuthMiddleware(controllers.GetGroup(groupService), userService)).Methods("GET", "OPTIONS")
	r.Handle("/api/v1/groups", mw.JwtAuthMiddleware(controllers.CreateGroup(groupService), userService)).Methods("POST", "OPTIONS")
	r.Handle("/api/v1/groups/{id}", mw.JwtAuthMiddleware(controllers.PatchPost(groupService), userService)).Methods("PATCH", "OPTIONS")
	r.Handle("/api/v1/groups/{id}", mw.JwtAuthMiddleware(controllers.DeletePost(groupService), userService)).Methods("DELETE", "OPTIONS")

	//On start
	log.Println(fmt.Sprintf("App's running on port: 3010"))
	if err := http.ListenAndServe(":3010", r); err != nil {
		panic(err)
	}
}
