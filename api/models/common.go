package models

import "github.com/dgrijalva/jwt-go"

type AuthenticationRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type ResponseUpdate struct {
	ModifiedCount int64 `json:"modifiedCount"`
	Result        interface{}
}

type ResponseDelete struct {
	DeletedCount int64 `json:"deletedCount"`
}


type AppConfiguration struct {
	Environment string
	Mongo       MongoConfiguration
}

type MongoConfiguration struct {
	Server      string
	Database    string
	Collections MongoCollections
}

type MongoCollections struct {
	Users string
	Posts string
}

type JWTToken struct {
	jwt.StandardClaims
	Name string `json:"name"`
}
