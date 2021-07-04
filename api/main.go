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

	postService := &services.PostService{
		Col: database.GetDB().Collection(config.GetConfig().Mongo.Collections.Posts),
		Ctx: database.GetGlobalContext(),
	}

	r := mux.NewRouter()
	//Common Middleware
	r.Use(mw.CorsMiddleware)
	r.Use(mw.XhrMiddleware)

	//Endpoints
	r.HandleFunc("/api/register", controllers.RegisterUser(userService)).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/authenticate", controllers.AuthenticateUser(userService)).Methods("POST", "OPTIONS")

	r.HandleFunc("/posts", controllers.FindPosts(postService)).Methods("GET")
	r.HandleFunc("/posts/{id}", controllers.GetPost(postService)).Methods("GET")
	r.HandleFunc("/posts", controllers.CreatePost(postService)).Methods("POST")
	r.HandleFunc("/posts/{id}", controllers.PatchPost(postService)).Methods("PATCH")
	r.HandleFunc("/posts/{id}", controllers.DeletePost(postService)).Methods("DELETE")

	//On start
	log.Println(fmt.Sprintf("App's running on port: 3010"))
	if err := http.ListenAndServe(":3010", r); err != nil {
		panic(err)
	}
}
