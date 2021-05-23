package config

import (
	"github.com/spf13/viper"
	m "nfc-api/models"
	"log"
)

var GetConfig = func() m.AppConfiguration {
	conf := m.AppConfiguration{}
	viper.SetConfigName("config")
	viper.SetConfigType("yml")
	viper.AddConfigPath("./config")

	err := viper.ReadInConfig()
	if err != nil {
		log.Panic(err)
	}
	err = viper.Unmarshal(&conf)
	if err != nil {
		log.Panic(err)
	}
	collections := m.MongoCollections{
		Users: "Users",
		Posts: "Posts",
	}
	conf.Mongo.Collections = collections
	return conf
}
