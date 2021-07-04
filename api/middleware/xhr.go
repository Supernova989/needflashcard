package middleware

import "net/http"

var XhrMiddleware = func(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			//Preflight request
			return
		}

		next.ServeHTTP(w, r)
	})
}
