// // https://forkify-api.herokuapp.com/v2
import icons from "../img/icons.svg";
import * as Model from "./models/Model";
import RecipeModel from "./models/RecipeModel";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";

async function recipeController(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;
    RecipeView.renderSpinner();

    // ********* Get recipe data Without Class ********//
    // await Model.loadRecipe(hashId);
    // RecipeView.render = <Recipe>Model.state.recipe;

    // ****** Get recipe data with Class ******** //
    await RecipeModel.getRecipe(hashId);
    // Display recipe
    RecipeView.render = RecipeModel.state.recipe!;
  } catch (error: any) {
    RecipeView.renderErrorMsg();
  }
}

async function searchResultController() {
  try {
    const query = SearchView.getQuery();
    if (!query) return;
    console.log(query);

    await RecipeModel.loadSearchResult(query);
  } catch (error) {}
}
console.log(RecipeModel.state);

function init() {
  RecipeView.renderHandler(recipeController);
  SearchView.searchHandler(searchResultController);
}

init();
