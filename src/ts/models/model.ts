import { API_URL } from "../config";
import { getJSON } from "../helper/helper";

const state = {
  recipe: {},
};

async function loadRecipe(hashId: string) {
  try {
    const data = await getJSON(`${API_URL}/${hashId}`);

    [state.recipe] = Object.values(data).map((recipe: any) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
    });
  } catch (error) {
    console.log(error);
  }
}

export { state, loadRecipe };
