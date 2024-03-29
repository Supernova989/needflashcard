package models

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"nfc-api/common"
	"unicode/utf8"
)

type User struct {
	ID        *primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string              `json:"email" bson:"email"`
	Confirmed bool                `json:"confirmed" bson:"confirmed"`
	Blocked   bool                `json:"blocked" bson:"blocked"`
	Username  string              `json:"username" bson:"username"`
	Password  string              `json:"password,omitempty" bson:"password"`
}

func (u *User) Validate() (error, int) {
	if !common.ValidateEmail(u.Email) {
		return fmt.Errorf("invalid email"), common.ErrorInvalidEmail
	}
	if utf8.RuneCountInString(u.Email) > 80 {
		return fmt.Errorf("Too long email"), common.ErrorLongEmail
	}
	if utf8.RuneCountInString(u.Password) < 6 {
		return fmt.Errorf("Too short password"), common.ErrorShortPassword
	}
	if utf8.RuneCountInString(u.Password) > 20 {
		return fmt.Errorf("Too long password"), common.ErrorLongPassword
	}

	return nil, 0
}
