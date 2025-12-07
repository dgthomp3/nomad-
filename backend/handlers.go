package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
)

type ChatRequest struct {
	Message string `json:"message"`
}

type ChatResponse struct {
	Response string      `json:"response"`
	Intent   string      `json:"intent"`
	Data     interface{} `json:"data,omitempty"`
}

func handleChat(c *gin.Context) {
	var req ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: "gpt-4o-mini",
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleSystem,
					Content: `You are NOMAD+, a smart kitchen assistant. Extract cooking intents from user messages.
					Respond with JSON: {"intent": "search_recipe|recipe_step|timer|ingredient_info", "query": "extracted_query", "response": "conversational_response"}
					For recipe searches, extract key terms. For steps, identify navigation (next/previous/repeat). For timers, extract duration.`,
				},
				{
					Role: openai.ChatMessageRoleUser,
					Content: req.Message,
				},
			},
		},
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var gptResponse map[string]interface{}
	if err := json.Unmarshal([]byte(resp.Choices[0].Message.Content), &gptResponse); err != nil {
		// Fallback if GPT doesn't return valid JSON
		c.JSON(http.StatusOK, ChatResponse{
			Response: resp.Choices[0].Message.Content,
			Intent:   "general",
		})
		return
	}

	// Handle recipe search intent
	if gptResponse["intent"] == "search_recipe" {
		query := gptResponse["query"].(string)
		recipes, err := searchSpoonacularRecipes(query)
		if err == nil {
			gptResponse["data"] = recipes
		}
	}

	c.JSON(http.StatusOK, ChatResponse{
		Response: gptResponse["response"].(string),
		Intent:   gptResponse["intent"].(string),
		Data:     gptResponse["data"],
	})
}

// handleRecipeSearch handles ingredient-based recipe search requests
func handleRecipeSearch(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "query parameter required"})
		return
	}

	recipes, err := searchSpoonacularRecipes(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"recipes": recipes})
}

func handleRecipeDetails(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid recipe ID"})
		return
	}

	recipe, err := getSpoonacularRecipeDetails(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, recipe)
}