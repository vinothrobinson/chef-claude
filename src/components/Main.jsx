import { useState } from "react";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const listIngredients = ingredients.map((item) => <li key={item}>{item}</li>);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input
          name="ingredient"
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add Ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      <ul>{listIngredients}</ul>
    </main>
  );
}
