package services

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	m "nfc-api/models"
)

type IGroupService interface {
	Get(string) (*m.Group, error)
	Find(filter interface{}, skip int64, limit int64) ([]m.Group, error)
	Insert(m.Group) (*m.Group, error)
	Update(string, interface{}) (m.ResponseUpdate, error)
	Delete(string) (m.ResponseDelete, error)
}

type GroupService struct {
	Ctx context.Context
	Col *mongo.Collection
}

func (c *GroupService) Get(id string) (*m.Group, error) {
	post := m.Group{}
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

func (c *GroupService) Find(filter interface{}, skip int64, limit int64) ([]m.Group, error) {
	posts := make([]m.Group, 0)
	if filter == nil {
		filter = bson.M{}
	}

	opts := &options.FindOptions{
		Limit: &limit,
		Skip: &skip,
		Sort: bson.M{"created_at": -1},
	}
	cursor, err := c.Col.Find(c.Ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	for cursor.Next(c.Ctx) {
		doc := m.Group{}
		cursor.Decode(&doc)
		posts = append(posts, doc)
	}
	return posts, nil
}

func (c *GroupService) Insert(doc m.Group) (*m.Group, error) {
	userId, err := primitive.ObjectIDFromHex(doc.UserID.(string))
	if err != nil {
		return nil, err
	}
	doc.UserID = userId
	res, err := c.Col.InsertOne(c.Ctx, doc)
	if err != nil {
		return nil, err
	}
	id := res.InsertedID.(primitive.ObjectID).Hex()
	return c.Get(id)
}

func (c *GroupService) Update(id string, update interface{}) (m.ResponseUpdate, error) {
	result := m.ResponseUpdate{
		ModifiedCount: 0,
	}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return result, err
	}
	group, err := c.Get(id)
	if err != nil {
		return result, err
	}
	var ex map[string]interface{}
	b, err := json.Marshal(group)
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
	newGroup, err := c.Get(id)
	if err != nil {
		return result, err
	}
	result.ModifiedCount = res.ModifiedCount
	result.Result = newGroup
	return result, nil
}

func (c *GroupService) Delete(id string) (m.ResponseDelete, error) {
	result := m.ResponseDelete{
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
