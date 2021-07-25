package controllers

import "nfc-api/services"

var postService services.IGroupService
var userService services.IUserService
var mongoTestHost = "mongodb://localhost:27017"
var mongoTestDB = "Nfc_db_test"
