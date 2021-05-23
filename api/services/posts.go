package services

import (
	"context"
	"encoding/json"
	m "nfc-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type IPostService interface {
	Get(string) (*m.Post, error)
	Find(interface{}) ([]m.Post, error)
	Insert(m.Post) (*m.Post, error)
	Update(string, interface{}) (m.RequestUpdate, error)
	Delete(string) (m.RequestDelete, error)
}

type PostService struct {
	Ctx context.Context
	Col *mongo.Collection
}

func (c *PostService) Get(id string) (*m.Post, error) {
	post := m.Post{}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	err = c.Col.FindOne(c.Ctx, bson.M{"_id": _id}).Decode(&post)
	if err != nil {
		return nil, err
	}
	return &post, nil
}

func (c *PostService) Find(filter interface{}) ([]m.Post, error) {
	posts := make([]m.Post, 0)
	if filter == nil {
		filter = bson.M{}
	}
	cursor, err := c.Col.Find(c.Ctx, filter)
	if err != nil {
		return nil, err
	}
	for cursor.Next(c.Ctx) {
		doc := m.Post{}
		cursor.Decode(&doc)
		posts = append(posts, doc)
	}
	return posts, nil
}

func (c *PostService) Insert(docs m.Post) (*m.Post, error) {
	res, err := c.Col.InsertOne(c.Ctx, docs)
	if err != nil {
		return nil, err
	}
	id := res.InsertedID.(primitive.ObjectID).Hex()
	return c.Get(id)
}

func (c *PostService) Update(id string, update interface{}) (m.RequestUpdate, error) {
	result := m.RequestUpdate{
		ModifiedCount: 0,
	}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return result, err
	}
	post, err := c.Get(id)
	if err != nil {
		return result, err
	}
	var ex map[string]interface{}
	b, err := json.Marshal(post)
	if err != nil {
		return result, err
	}
	json.Unmarshal(b, &ex)
	change := update.(map[string]interface{})
	for k := range change {
		if change[k] == ex[k] {
			delete(change, k)
		}
	}
	if len(change) == 0 {
		return result, nil
	}
	res, err := c.Col.UpdateOne(c.Ctx, bson.M{"_id": _id}, bson.M{"$set": change})
	if err != nil {
		return result, err
	}
	newPost, err := c.Get(id)
	if err != nil {
		return result, err
	}
	result.ModifiedCount = res.ModifiedCount
	result.Result = newPost
	return result, nil
}

func (c *PostService) Delete(id string) (m.RequestDelete, error) {
	result := m.RequestDelete{
		DeletedCount: 0,
	}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return result, err
	}
	res, err := c.Col.DeleteOne(c.Ctx, bson.M{"_id": _id})
	if err != nil {
		return result, err
	}
	result.DeletedCount = res.DeletedCount
	return result, nil
}
