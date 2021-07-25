package services

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	m "nfc-api/models"
)

type IGroupService interface {
	Get(string) (*m.Group, error)
	Find(filter primitive.M, skip int64, limit int64) (data []m.Group, total int, error error)
	Insert(m.Group) (*m.Group, error)
	Update(string, interface{}) (m.ResponseUpdate, error)
	Delete(string) (m.ResponseDelete, error)
}

type GroupService struct {
	Ctx context.Context
	Col *mongo.Collection
	DB  *mongo.Database
}

func (c *GroupService) Get(id string) (*m.Group, error) {
	group := m.Group{}
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	err = c.Col.FindOne(c.Ctx, bson.M{"_id": _id}).Decode(&group)
	if err != nil {
		return nil, err
	}
	return &group, nil
}

func (c *GroupService) Find(filter primitive.M, skip int64, limit int64) ([]m.Group, int, error) {
	type QueryResult struct {
		Data  []m.Group `bson:"data"`
		Total int       `bson:"total"`
	}
	qr := make([]QueryResult, 0)
	if filter == nil {
		filter = bson.M{}
	}
	countQuery := bson.A{bson.D{{"$count", "total"}}}
	dataQuery := bson.A{
		bson.D{{"$sort", bson.M{"created_at": -1}}},
		bson.D{{"$skip", &skip}},
		bson.D{{"$limit", &limit}},
		bson.D{{"$match", filter}},
		bson.D{{"$lookup", bson.D{
			{"from", "Words"},
			{"localField", "_id"},
			{"foreignField", "groupId"},
			{"as", "words"},
		}}},
		bson.D{{"$addFields", bson.M{"words": bson.M{"$size": "$words"}}}},
	}

	showLoadedStructCursor, err := c.Col.Aggregate(c.Ctx, mongo.Pipeline{
		bson.D{{"$facet", bson.D{
			{"data", dataQuery},
			{"metadata", countQuery},
		}}},
		bson.D{{"$project", bson.D{
			{"total", bson.D{{"$arrayElemAt", bson.A{"$metadata.total", 0}}}},
			{"data", 1},
		}}},
	})
	if err != nil {
		return nil, 0, err
	}
	if err = showLoadedStructCursor.All(c.Ctx, &qr); err != nil {
		return nil, 0, err
	}
	return qr[0].Data, qr[0].Total, nil
}

func (c *GroupService) Insert(doc m.Group) (*m.Group, error) {
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
