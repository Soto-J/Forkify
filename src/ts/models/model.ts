import { API_URL } from "../config";
import { getJSON } from "../helper/helper";

const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

async function loadRecipe(hashId: string) {
  try {
    const data = await getJSON(`${API_URL}/${hashId}`);
    state.recipe = formatRecipeKeys(data);
  } catch (error) {
    throw error;
  }
}

async function loadSearchResults(query: string) {
  try {
    const data = await getJSON(`${API_URL}/${query}`);
  } catch (error) {
    throw error;
  }
}

function formatRecipeKeys(data: any) {
  const [recipe] = Object.values(data).map((recipe: any) => {
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
  return recipe;
}

function formartSearchResultsKeys(data: any) {
  const results = data.recipe.map((val: any) => {
    return {
      id: val.id,
      title: val.title,
      image: val.image_url,
      publisher: val.publisher,
    };
  });
}

export { state, loadRecipe, loadSearchResults };
