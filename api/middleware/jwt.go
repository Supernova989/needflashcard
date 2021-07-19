package middleware

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"log"
	"net/http"
	cmn "nfc-api/common"
	m "nfc-api/models"
	"nfc-api/services"
	"os"
	"strings"
)

const authHeader = "Authorization"

var JwtAuthMiddleware = func(next http.Handler, srv services.IUserService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := r.Header.Get("X-Real-Ip")
		if ip == "" {
			ip = r.RemoteAddr
		}
		tokenHeader := r.Header.Get(authHeader)

		// Token is missing
		if tokenHeader == "" {
			cmn.WriteJsonResponse(w, nil, http.StatusForbidden, &cmn.ErrorMissingAuthData)
			return
		}
		// Check token's format
		split := strings.Split(tokenHeader, " ")
		if len(split) != 2 {
			cmn.WriteJsonResponse(w, nil, http.StatusForbidden, &cmn.ErrorInvalidToken)
			return
		}
		// Parse "Authorization" header's value
		tokenPart := split[1]
		tk := &m.JWTToken{}
		token, err := jwt.ParseWithClaims(tokenPart, tk, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("SECRET")), nil
		})
		// Malformed token
		if err != nil {
			cmn.WriteJsonResponse(w, nil, http.StatusForbidden, &cmn.ErrorInvalidToken)
			return
		}
		// Token is invalid
		if !token.Valid {
			cmn.WriteJsonResponse(w, nil, http.StatusForbidden, &cmn.ErrorInvalidToken)
			return
		}
		// Fetch User related to token
		_, err = srv.Get(tk.Issuer)
		if err != nil {
			log.Printf("Invalid token: user [%s] not found", tk.Issuer)
			cmn.WriteJsonResponse(w, nil, http.StatusForbidden, &cmn.ErrorInvalidToken)
			return
		}

		// Generate context
		ctx := cmn.ContextPayload{M: map[string]string{
			"user": tk.Issuer,
		}}
		r = r.WithContext(context.WithValue(r.Context(), 0, ctx))
		next.ServeHTTP(w, r)
	})
}