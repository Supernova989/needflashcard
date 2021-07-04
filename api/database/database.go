package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"nfc-api/config"
	m "nfc-api/models"
	"time"
)

var db *mongo.Database
var gCtx context.Context
var cnf m.AppConfiguration

func Initialize() {
	cnf = config.GetConfig()
	gCtx = context.TODO()
	db = ConnectDB(gCtx, cnf.Mongo)
}

func ConnectDB(ctx context.Context, cfg m.MongoConfiguration) *mongo.Database {
	conn := options.Client().ApplyURI(cfg.Server)

	log.Printf(
		"Connenting to Mongo...\nServer: %s\nDatabase: %s",
		cfg.Server,
		cfg.Database,
	)

	client, err := mongo.Connect(ctx, conn)
	if err != nil {
		log.Panic(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5 * time.Second)
	defer cancel()
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		log.Panicf("Could not ping to mongo db service: %v", err)
	} else {
		log.Println("Successfully connected to MongoDB")
	}

	return client.Database(cfg.Database)
}

func GetDB() *mongo.Database {
	return db
}

func GetGlobalContext() context.Context {
	return gCtx
}
