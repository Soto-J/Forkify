// // https://forkify-api.herokuapp.com/v2
import icons from "../img/icons.svg";
import * as Model from "./models/Model";
import RecipeModel from "./models/RecipeModel";
import RecipeView from "./views/RecipeView";
import ResultsView from "./views/ResultsView";
import SearchView from "./views/SearchView";

async function recipeController(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;
    RecipeView.renderSpinner();
    // ********* Get recipe data Without Class ********//
    // await Model.loadRecipe(hashId);
    // RecipeView.render = <Recipe>Model.state.recipe;
    // **********************

    await RecipeModel.getRecipe(hashId);
    // Display recipe
    RecipeView.render = RecipeModel.state.recipe!;
  } catch (error) {
    RecipeView.renderErrorMsg();
  }
}

// On Submit controller
async function searchController() {
  try {
    ResultsView.renderSpinner();

    const query = SearchView.getSearchQuery();
    if (!query) return;

    await RecipeModel.loadSearchResult(query);
    console.log(RecipeModel.state);
  } catch (error) {
    console.log(error);
  }
}

function init() {
  RecipeView.renderHandler(recipeController);
  SearchView.searchHandler(searchController);
}

console.log(RecipeModel.state);

init();
