package controllers

import (
	"log"
	"math/rand"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/Samuel-Lewis/Password-Custard/app/models/feature"
)

// PassOut response type to the write
type PassOut struct {
	Password string
}

// Raw handles the /raw call (used for all password generating)
func Raw(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	// TODO: replace with some preset or default?
	q := "word:2:3,symbol:1:2,titlecase:1:1,number:1:1,uppercase:0:1"
	if val, ok := r.URL.Query()["q"]; ok {
		if matched, _ := regexp.MatchString("^((([a-z]+):(\\d+):(\\d+),)*)(([a-z]+):(\\d+):(\\d+))(,)?$", val[0]); matched {
			q = string(val[0])
		} else {
			// TODO: Give some real feedback to user? w.Write(generateErrorMessage()) ?
			log.Println("Failed to parse q")
		}
	}
	q = strings.TrimSuffix(q, ",")
	w.Write([]byte(generatePassword(q)))
}

// GeneratePassword makes the password
func generatePassword(q string) string {
	var feats []string

	items := strings.Split(q, ",")
	for _, i := range items {
		tokens := strings.Split(i, ":")

		// Error checked in initial parse at controllers.Raw
		rangeS, _ := strconv.Atoi(tokens[1])
		rangeE, _ := strconv.Atoi(tokens[2])

		r := rangeE - rangeS + 1
		if r > 0 {
			r = rand.Intn(r)
		}
		r += rangeS

		for r > 0 {
			r--
			feats = append(feats, feature.Choose(tokens[0]))
		}
	}

	// Orders application of features
	feats = feature.Order(feats)

	// Apply features
	phrase := []string{}
	for _, f := range feats {
		phrase = feature.Apply(f)(phrase)
	}

	return strings.Join(phrase, "")
}
