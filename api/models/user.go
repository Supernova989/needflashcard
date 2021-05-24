package models

type User struct {
	ID        interface{} `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string      `json:"email" bson:"email"`
	Confirmed bool        `json:"confirmed" bson:"confirmed"`
	Username  string      `json:"username" bson:"username"`
}
