package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type Recipe struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Time       string `json:"time"`
	Difficulty string `json:"difficulty"`
	Image      string `json:"image,omitempty"`
	Servings   int    `json:"servings,omitempty"`
}

type RecipeDetails struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Time        string   `json:"time"`
	Servings    int      `json:"servings"`
	Image       string   `json:"image,omitempty"`
	Ingredients []string `json:"ingredients"`
	Steps       []string `json:"steps"`
}

type SpoonacularSearchResponse struct {
	Results []struct {
		ID                int    `json:"id"`
		Title             string `json:"title"`
		ReadyInMinutes    int    `json:"readyInMinutes"`
		SpoonacularScore  int    `json:"spoonacularScore"`
		Image             string `json:"image"`
		Servings          int    `json:"servings"`
	} `json:"results"`
}

type SpoonacularRecipeResponse struct {
	ID                 int    `json:"id"`
	Title              string `json:"title"`
	ReadyInMinutes     int    `json:"readyInMinutes"`
	Servings           int    `json:"servings"`
	Image              string `json:"image"`
	ExtendedIngredients []struct {
		Original string `json:"original"`
	} `json:"extendedIngredients"`
}

type SpoonacularInstructionsResponse []struct {
	Steps []struct {
		Step string `json:"step"`
	} `json:"steps"`
}

func searchSpoonacularRecipes(query string) ([]Recipe, error) {
	apiKey := os.Getenv("SPOONACULAR_API_KEY")
	if apiKey == "" || apiKey == "your_spoonacular_api_key" {
		// Return mock data for development
		return []Recipe{
			{ID: 1, Name: "Pasta Carbonara", Time: "20 min", Difficulty: "Medium"},
			{ID: 2, Name: "Chicken Stir Fry", Time: "15 min", Difficulty: "Easy"},
		}, nil
	}

	url := fmt.Sprintf("https://api.spoonacular.com/recipes/complexSearch?query=%s&number=12&apiKey=%s&addRecipeInformation=true", query, apiKey)
	
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var searchResp SpoonacularSearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&searchResp); err != nil {
		return nil, err
	}

	recipes := make([]Recipe, len(searchResp.Results))
	for i, r := range searchResp.Results {
		difficulty := "Hard"
		if r.SpoonacularScore > 70 {
			difficulty = "Easy"
		} else if r.SpoonacularScore > 40 {
			difficulty = "Medium"
		}

		recipes[i] = Recipe{
			ID:         r.ID,
			Name:       r.Title,
			Time:       fmt.Sprintf("%d min", r.ReadyInMinutes),
			Difficulty: difficulty,
			Image:      r.Image,
			Servings:   r.Servings,
		}
	}

	return recipes, nil
}

func getSpoonacularRecipeDetails(id int) (*RecipeDetails, error) {
	apiKey := os.Getenv("SPOONACULAR_API_KEY")
	if apiKey == "" || apiKey == "your_spoonacular_api_key" {
		// Return mock data for development
		return &RecipeDetails{
			ID:       id,
			Name:     "Pasta Carbonara",
			Time:     "20 min",
			Servings: 4,
			Ingredients: []string{"400g spaghetti", "200g pancetta", "4 eggs", "100g Parmesan"},
			Steps: []string{
				"Boil water in a large pot",
				"Cook pasta according to package directions",
				"Cook pancetta until crispy",
				"Mix eggs with cheese",
				"Combine pasta with egg mixture",
			},
		}, nil
	}

	// Get recipe info
	infoURL := fmt.Sprintf("https://api.spoonacular.com/recipes/%d/information?apiKey=%s", id, apiKey)
	infoResp, err := http.Get(infoURL)
	if err != nil {
		return nil, err
	}
	defer infoResp.Body.Close()

	var recipe SpoonacularRecipeResponse
	if err := json.NewDecoder(infoResp.Body).Decode(&recipe); err != nil {
		return nil, err
	}

	// Get instructions
	instURL := fmt.Sprintf("https://api.spoonacular.com/recipes/%d/analyzedInstructions?apiKey=%s", id, apiKey)
	instResp, err := http.Get(instURL)
	if err != nil {
		return nil, err
	}
	defer instResp.Body.Close()

	var instructions SpoonacularInstructionsResponse
	if err := json.NewDecoder(instResp.Body).Decode(&instructions); err != nil {
		return nil, err
	}

	// Extract ingredients
	ingredients := make([]string, len(recipe.ExtendedIngredients))
	for i, ing := range recipe.ExtendedIngredients {
		ingredients[i] = ing.Original
	}

	// Extract steps
	var steps []string
	if len(instructions) > 0 {
		steps = make([]string, len(instructions[0].Steps))
		for i, step := range instructions[0].Steps {
			steps[i] = step.Step
		}
	}

	return &RecipeDetails{
		ID:          recipe.ID,
		Name:        recipe.Title,
		Time:        fmt.Sprintf("%d min", recipe.ReadyInMinutes),
		Servings:    recipe.Servings,
		Image:       recipe.Image,
		Ingredients: ingredients,
		Steps:       steps,
	}, nil
}