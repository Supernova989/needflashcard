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

type JsonResponse struct {
	Payload      interface{} `json:"payload"`
	ErrorCode    *int        `json:"error_code,omitempty"`
	ErrorMessage string      `json:"error_message,omitempty"`
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
