package models

type Post struct {
	ID     interface{} `json:"id,omitempty" bson:"_id,omitempty"`
	UserID int         `json:"userId" bson:"userId"`
	Title  string      `json:"title" bson:"title"`
	Body   string      `json:"body" bson:"body"`
}
