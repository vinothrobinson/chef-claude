import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function showRecipe() {
    setRecipeShown((prevState) => !prevState);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          name="ingredient"
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add Ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} showRecipe={showRecipe} />
      )}
      {recipeShown && <ClaudeRecipe />}
    </main>
  );
}
