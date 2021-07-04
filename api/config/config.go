package config

import (
	"github.com/spf13/viper"
	"log"
	"nfc-api/common"
	m "nfc-api/models"
)

var GetConfig = func() m.AppConfiguration {
	conf := m.AppConfiguration{}
	suffix := "dev"
	if common.IsProduction() {
		suffix = "prod"
	}
	viper.SetConfigName("config." + suffix)
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
