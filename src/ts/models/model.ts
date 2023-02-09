// import { recipe } from "../types/types";

const state = {
  recipe: {},
};

async function loadRecipe(hashId: string) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${hashId}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const { data } = await response.json();
    
    state.recipe = {
      id: data.recipe.id,
      title: data.recipe.title,
      publisher: data.recipe.publisher,
      sourceUrl: data.recipe.source_url,
      image: data.recipe.image_url,
      servings: data.recipe.servings,
      cookingTime: data.recipe.cooking_time,
      ingredients: data.recipe.ingredients,
    };
  } catch (error) {}
}

export { state, loadRecipe };
