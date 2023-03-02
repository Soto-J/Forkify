import PaginationView from "./views/PaginationView";
import RecipeModel from "./models/RecipeModel";
import ResultsView from "./views/ResultsView";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";

async function recipeController(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;
    RecipeView.renderSpinner();

    // Update DOM to reflect highlighted recipe
    ResultsView.updateDOM(RecipeModel.getSearchResultPerPage());

    // Render main recipe
    await RecipeModel.getRecipe(hashId);
    RecipeView.render(RecipeModel.state.recipe);
  } catch (error) {
    RecipeView.renderErrorMsg();
  }
}

function addBookmarkController() {
  RecipeModel.addBookmark(RecipeModel.state.recipe);
  console.log(RecipeModel.state.bookmarks);
  RecipeView.updateDOM(RecipeModel.state.recipe);
}

async function searchController(): Promise<void> {
  try {
    ResultsView.renderSpinner();

    const query = SearchView.getSearchQuery();
    if (!query) return;

    await RecipeModel.loadSearchResult(query);
    // console.log(RecipeModel.state);

    // Render Results list and Pagination Buttons
    ResultsView.render(RecipeModel.getSearchResultPerPage());
    PaginationView.render(RecipeModel.state.search);
  } catch (error) {
    ResultsView.renderErrorMsg();
  }
}

function paginationController(goToPage: number): void {
  // onButtonClick - Rerender results list and Buttons
  ResultsView.render(RecipeModel.getSearchResultPerPage(goToPage));
  PaginationView.render(RecipeModel.state.search);

  console.log(`Testing:`, RecipeModel.state.search.page);
}

// Update Servings
function servingsController(servingsUpdate: number): void {
  servingsUpdate += RecipeModel.state.recipe.servings;
  if (servingsUpdate === 0) return;

  RecipeModel.updateServings(servingsUpdate);

  RecipeView.updateDOM(RecipeModel.state.recipe);
}

function init() {
  RecipeView.renderHandler(recipeController);
  RecipeView.addBookmarkHandler(addBookmarkController);
  SearchView.searchHandler(searchController);
  PaginationView.onClickHandler(paginationController);
  RecipeView.servingsHandler(servingsController);
  console.log(RecipeModel.state);
}

init();
