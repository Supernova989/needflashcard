package models

import (
	"fmt"
	"nfc-api/common"
	"time"
	"unicode/utf8"
)

type Group struct {
	ID          interface{} `json:"id,omitempty" bson:"_id,omitempty"`
	UserID      interface{}         `json:"userId" bson:"userId"`
	Title       string      `json:"title" bson:"title"`
	Description string      `json:"description" bson:"description"`
	CreatedAt   time.Time   `json:"created_at" bson:"created_at"`
}

func (g *Group) Validate() (error, int) {
	if utf8.RuneCountInString(g.Title) < 3 {
		return fmt.Errorf("Too short title"), common.ErrorShortTitle
	}
	if utf8.RuneCountInString(g.Title) > 80 {
		return fmt.Errorf("Too long title"), common.ErrorLongTitle
	}
	if utf8.RuneCountInString(g.Description) < 10 {
		return fmt.Errorf("Too short description"), common.ErrorShortDescription
	}
	if utf8.RuneCountInString(g.Description) > 120 {
		return fmt.Errorf("Too long description"), common.ErrorLongDescription
	}
	if g.UserID == nil {
		return fmt.Errorf("No user defined"), common.ErrorNoUserOwner
	}
	return nil, 0
}