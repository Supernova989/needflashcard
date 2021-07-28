package services

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	m "nfc-api/models"
	"time"
)

type IWordService interface {
	Get(string) (*m.Word, error)
	Insert(word m.Word, user primitive.ObjectID) (*m.Word, error)
	Find(filter primitive.D) ([]*map[string]interface{}, error)
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
	var inserted *mongo.InsertOneResult
	err := c.DB.Client().UseSession(c.Ctx, func(sessionContext mongo.SessionContext) error {
		err := sessionContext.StartTransaction()
		if err != nil {
			sessionContext.AbortTransaction(sessionContext)
			return err
		}
		inserted, err = c.Col.InsertOne(c.Ctx, doc)
		if err != nil {
			sessionContext.AbortTransaction(sessionContext)
			return err
		}
		groupIds := bson.A{}
		for _, id := range doc.GroupID {
			groupIds = append(groupIds, id)
		}
		_, err = c.DB.Collection("Groups").UpdateMany(
			c.Ctx,
			bson.D{{"_id", bson.D{{"$in", groupIds}}}},
			bson.D{{"$set", bson.D{{"updated_at", time.Now()}}}},
		)
		if err != nil {
			sessionContext.AbortTransaction(sessionContext)
			return err
		} else {
			sessionContext.CommitTransaction(sessionContext)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	id := inserted.InsertedID.(primitive.ObjectID).Hex()
	return c.Get(id)
}

func (c *WordService) Find(filter primitive.D) ([]*map[string]interface{}, error) {
	words := make([]*map[string]interface{}, 0)
	showLoadedStructCursor, err := c.Col.Aggregate(c.Ctx, mongo.Pipeline{
		bson.D{{"$match", filter}},
		bson.D{{"$limit", 11}},
		bson.D{{"$project", bson.D{
			{"_id", 0},
			{"id", "$_id"},
			{"title", "$title"},
		}}},
	})
	if err != nil {
		return nil, err
	}
	if err = showLoadedStructCursor.All(c.Ctx, &words); err != nil {
		return nil, err
	}
	return words, nil
}
