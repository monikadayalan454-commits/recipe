import { useState } from "react";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    if (!ingredient) return;

    setLoading(true);

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const data = await response.json();

    setRecipes(data.meals || []);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🍳 Recipe Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Ingredient (Chicken, Egg, Rice...)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />

        <button onClick={searchRecipes}>
          Search
        </button>
      </div>

      {loading && <h2>Loading Recipes...</h2>}

      {!loading && recipes.length === 0 && (
        <p className="no-result">
          No recipes found. Try another ingredient.
        </p>
      )}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="card" key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />

            <h3>{recipe.strMeal}</h3>

            <a
              href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
              target="_blank"
              rel="noreferrer"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;