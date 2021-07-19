package services

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"nfc-api/common"
	m "nfc-api/models"
	"os"
	"time"
)

type IUserService interface {
	Get(string) (*m.User, error)
	Insert(m.User) (*m.User, error)
	Find(interface{}) ([]m.User, error)
	Delete(string) (m.ResponseDelete, error)
	CheckIfExists(email string, username string) (bool, error)
	Authenticate(email string, password string) (error, int, string, *m.User)
}

type UserService struct {
	Ctx context.Context
	Col *mongo.Collection
}

func (c *UserService) Authenticate(email string, password string) (error, int, string, *m.User) {
	user := m.User{}
	err := c.Col.FindOne(c.Ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		return fmt.Errorf("user not found"), common.ErrorInvalidCredentials, "", nil
	}
	if err != nil && (err == bcrypt.ErrMismatchedHashAndPassword || err == bcrypt.ErrHashTooShort) {
		return fmt.Errorf("Invalid credentials"), common.ErrorInvalidCredentials, "", nil
	}
	if user.Blocked {
		return fmt.Errorf("User is blocked"), common.ErrorAccountBlocked, "", nil
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	expirationHours := 120
	tk := &m.JWTToken{}
	tk.IssuedAt = time.Now().Unix()
	tk.ExpiresAt = time.Now().Add(time.Hour * time.Duration(expirationHours)).Unix()
	tk.Issuer = user.ID.(primitive.ObjectID).Hex()
	jwtWithClaims := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	signedToken, _ := jwtWithClaims.SignedString([]byte(os.Getenv("SECRET")))
	return nil, 0, signedToken, &user
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

func (c *UserService) Delete(id string) (m.ResponseDelete, error) {
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
