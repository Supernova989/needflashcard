package services

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	m "nfc-api/models"
)

type IWordService interface {
	Get(string) (*m.Word, error)
	Insert(word m.Word, user primitive.ObjectID) (*m.Word, error)
	//Find(interface{}) ([]m.User, error)
	//Delete(string) (m.ResponseDelete, error)
	//CheckIfExists(email string, username string) (bool, error)
	//Authenticate(email string, password string) (error, int, string, *m.User)
}

type WordService struct {
	Ctx context.Context
	Col *mongo.Collection
	DB  *mongo.Database
}

func (c *WordService) Get(id string) (*m.Word, error) {
	word := m.Word{}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	err = c.Col.FindOne(c.Ctx, bson.M{"_id": _id}).Decode(&word)
	if err != nil {
		return nil, err
	}
	return &word, nil
}

func (c *WordService) Insert(doc m.Word, user primitive.ObjectID) (*m.Word, error) {
	res, err := c.Col.InsertOne(c.Ctx, doc)
	if err != nil {
		return nil, err
	}
	id := res.InsertedID.(primitive.ObjectID).Hex()
	return c.Get(id)
}
