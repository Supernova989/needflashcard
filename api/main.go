package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"nfc-api/config"
	"nfc-api/controllers"
	"nfc-api/database"
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

	r.HandleFunc("/api/v1/register", controllers.RegisterUser(userService)).Methods("POST")

	r.HandleFunc("/posts", controllers.FindPosts(postService)).Methods("GET")
	r.HandleFunc("/posts/{id}", controllers.GetPost(postService)).Methods("GET")
	r.HandleFunc("/posts", controllers.CreatePost(postService)).Methods("POST")
	r.HandleFunc("/posts/{id}", controllers.PatchPost(postService)).Methods("PATCH")
	r.HandleFunc("/posts/{id}", controllers.DeletePost(postService)).Methods("DELETE")

	log.Println(fmt.Sprintf("App's running on port: 3010"))
	if err := http.ListenAndServe(":3010", r); err != nil {
		panic(err)
	}
}
