package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"strings"

	"github.com/Samuel-Lewis/Password-Custard/app/models"
)

// PassOut response type to the write
type PassOut struct {
	Password string
}

// Raw handles the /raw call (used for all password generating)
func Raw(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(generatePassword()))
}

// GeneratePassword makes the password
func generatePassword() string {

	phrase := []string{
		models.VerbList[rand.Intn(len(models.VerbList))],
		models.AdjList[rand.Intn(len(models.AdjList))],
		models.NounList[rand.Intn(len(models.NounList))],
	}

	// capitalize random word and title casing
	phrase = capitalize(phrase)

	// Replace leet
	phrase = leet(phrase)

	// insert numbers
	phrase = insert(phrase, strconv.Itoa(rand.Intn(1000)))

	// insert symbols
	phrase = insert(phrase, string(models.Symbols[rand.Intn(len(models.Symbols))]))

	return strings.Join(phrase, "")
}

// capitalize random word and title casing
func capitalize(phrase []string) []string {
	// Title case everything
	var newPhrase []string
	for _, x := range phrase {
		newPhrase = append(newPhrase, strings.Title(x))
	}

	phrase = newPhrase
	randWord := rand.Intn(len(phrase) + 1)

	// No block capitals, title case only
	if randWord == len(phrase) {
		return phrase
	}

	// Upper case a word (remove title on following)
	phrase[randWord] = strings.ToUpper(phrase[randWord])
	randWord = (randWord + 1) % len(phrase)
	phrase[randWord] = strings.ToLower(phrase[randWord])

	return phrase
}

// leet chars on random values
func leet(phrase []string) []string {
	// repeats := rand.Intn(len(phrase) - 1)
	// for i := 1; i <= repeats; i++ {
	// 	randWord := rand.Intn(len(phrase))

	// }

	return phrase
}

// Number adds random number between words
func insert(phrase []string, in string) []string {
	word := rand.Intn(len(phrase) + 1)

	if word == len(phrase) {
		phrase[word-1] = fmt.Sprint(phrase[word-1], in)
	} else {
		phrase[word] = fmt.Sprint(in, phrase[word])
	}

	return phrase
}
