package models

type RegisterRequest struct {
	Username string
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
