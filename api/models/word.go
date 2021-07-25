package models

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"nfc-api/common"
	"time"
	"unicode/utf8"
)

type Word struct {
	ID         *primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	GroupID    *primitive.ObjectID `json:"groupId" bson:"groupId"`
	Title      string              `json:"title" bson:"title"`
	Definition string              `json:"definition" bson:"definition"`
	Examples   []*WordExample      `json:"examples" bson:"examples"`
	CreatedAt  time.Time           `json:"created_at" bson:"created_at"`
}

type WordExample struct {
	ID   *primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Text string              `json:"text" bson:"text"`
}

func (w *Word) Validate() (error, int) {
	if len(w.Examples) == 0 {
		return fmt.Errorf("No examples"), common.ErrorNoExamples
	}
	for _, example := range w.Examples {
		if utf8.RuneCountInString(example.Text) > 200 {
			return fmt.Errorf("Too long example"), common.ErrorLongExample
		}
	}
	if utf8.RuneCountInString(w.Title) < 1 {
		return fmt.Errorf("Too short word"), common.ErrorShortWord
	}
	if utf8.RuneCountInString(w.Title) > 20 {
		return fmt.Errorf("Too long word"), common.ErrorLongWord
	}
	if utf8.RuneCountInString(w.Definition) < 1 {
		return fmt.Errorf("Too short definition"), common.ErrorShortDefinition
	}
	if utf8.RuneCountInString(w.Definition) > 200 {
		return fmt.Errorf("Too long definition"), common.ErrorLongDefinition
	}

	return nil, 0
}
