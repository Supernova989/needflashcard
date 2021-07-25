package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Word struct {
	ID          *primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	UserID      interface{}         `json:"userId" bson:"userId"`
	Title       string              `json:"title" bson:"title"`
	Description string              `json:"description" bson:"description"`
	CreatedAt   time.Time           `json:"created_at" bson:"created_at"`
}
