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
    // Display main recipe
    RecipeView.render(RecipeModel.state.recipe);
  } catch (error) {
    RecipeView.renderErrorMsg();
  }
}

async function searchController(): Promise<void> {
  try {
    ResultsView.renderSpinner();

    const query = SearchView.getSearchQuery();
    if (!query) return;

    await RecipeModel.loadSearchResult(query);
    console.log(RecipeModel.state);

    // Render results list
    ResultsView.render(RecipeModel.getSearchResultPerPage());
  } catch (error) {
    ResultsView.renderErrorMsg();
  }
}

function init() {
  RecipeView.renderHandler(recipeController);
  SearchView.searchHandler(searchController);
}

console.log(RecipeModel.state);

init();
