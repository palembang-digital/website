package main

import (
	"log"
	"net/http"
	"os"

	"github.com/markbates/pkger"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting application on port %s...", port)

	fs := http.FileServer(pkger.Dir("/ui/build"))
	http.Handle("/", fs)

	http.HandleFunc("/-/ping", pingHandler)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// pingHandler write pong to http.ResponseWriter.
func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}
