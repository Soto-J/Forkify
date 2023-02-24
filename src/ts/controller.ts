import RecipeModel from "./models/RecipeModel";
import PaginationView from "./views/PaginationView";
import RecipeView from "./views/RecipeView";
import ResultsView from "./views/ResultsView";
import SearchView from "./views/SearchView";

async function recipeController(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;

    RecipeView.renderSpinner();

    await RecipeModel.getRecipe(hashId);
    // Render main recipe
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

    // Render Results list
    ResultsView.render(RecipeModel.getSearchResultPerPage(3));
    // Render Pagination Buttons
    PaginationView.render(RecipeModel.state.search);
  } catch (error) {
    ResultsView.renderErrorMsg();
  }
}

function init() {
  RecipeView.renderHandler(recipeController);
  SearchView.searchHandler(searchController);
  PaginationView.onClickHandler();
}

console.log(RecipeModel.state);

init();
