package services

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	m "nfc-api/models"
)

type IUserService interface {
	Get(string) (*m.User, error)
	Insert(m.User) (*m.User, error)
	Find(interface{}) ([]m.User, error)
	CheckIfExists(email string, username string) (bool, error)
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

func (c *UserService) Find(filter interface{}) ([]m.User, error) {
	posts := make([]m.User, 0)
	if filter == nil {
		filter = bson.M{}
	}
	cursor, err := c.Col.Find(c.Ctx, filter)
	if err != nil {
		return nil, err
	}
	for cursor.Next(c.Ctx) {
		doc := m.User{}
		cursor.Decode(&doc)
		posts = append(posts, doc)
	}
	return posts, nil
}
func (c *UserService) CheckIfExists(email string, username string) (bool, error) {
	posts := make([]m.User, 0)

	filter := bson.M{"$or": []bson.M{
		bson.M{"email": email},
		bson.M{"username": username},
	}}
	cursor, err := c.Col.Find(c.Ctx, filter)
	if err != nil {
		return false, err
	}
	for cursor.Next(c.Ctx) {
		doc := m.User{}
		cursor.Decode(&doc)
		posts = append(posts, doc)
	}
	return len(posts) > 0, nil
}

func (c *UserService) Insert(doc m.User) (*m.User, error) {
	hashedPassword, _ := bcrypt.GenerateFromPassword(
		[]byte(doc.Password), bcrypt.DefaultCost,
	)
	doc.Password = string(hashedPassword)
	res, err := c.Col.InsertOne(c.Ctx, doc)
	if err != nil {
		return nil, err
	}
	id := res.InsertedID.(primitive.ObjectID).Hex()
	created, err := c.Get(id)
	if err != nil {
		return nil, err
	}
	created.Password = ""
	return created, nil
}
