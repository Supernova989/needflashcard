package database

import (
	"context"
	"nfc-api/config"
	m "nfc-api/models"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
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
		"Connenting to Mongo, using \"%s\" as a server, \"%s\" as a database...",
		cfg.Server,
		cfg.Database,
	)

	client, err := mongo.Connect(ctx, conn)
	if err != nil {
		log.Panic(err)
	}
	return client.Database(cfg.Database)
}

func GetDB() *mongo.Database {
	return db
}

func GetGlobalContext() context.Context {
	return gCtx
}
