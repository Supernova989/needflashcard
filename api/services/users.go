package services

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	m "nfc-api/models"
)

type IUserService interface {
	Get(string) (*m.User, error)
	Insert(m.User) (*m.User, error)
}

type UserService struct {
	Ctx context.Context
	Col *mongo.Collection
}

func (c *UserService) Get(id string) (*m.User, error) {
	user := m.User{}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	err = c.Col.FindOne(c.Ctx, bson.M{"_id": _id}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (c *UserService) Insert(doc m.User) (*m.User, error) {
	res, err := c.Col.InsertOne(c.Ctx, doc)
	if err != nil {
		return nil, err
	}
	id := res.InsertedID.(primitive.ObjectID).Hex()
	return c.Get(id)
}
