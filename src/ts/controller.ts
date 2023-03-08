import RecipeModel from "./models/RecipeModel";
import PaginationView from "./views/components/PaginationView";
import ResultsView from "./views/components/ResultsView";
import RecipeView from "./views/components/RecipeView";
import SearchView from "./views/components/SearchView";
import BookmarkView from "./views/components/BookmarkView";
import AddRecipeView from "./views/components/AddRecipeView";

async function recipeController(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;
    RecipeView.renderSpinner();

    // Update DOM to reflect highlighted recipe
    ResultsView.updateDOM(RecipeModel.getSearchResultPerPage());
    BookmarkView.updateDOM(RecipeModel.state.bookmarks);

    // Render main recipe
    await RecipeModel.getRecipe(hashId);
    RecipeView.render(RecipeModel.state.recipe);
  } catch (error) {
    RecipeView.renderErrorMsg();
  }
}

function servingsController(servingsUpdate: number): void {
  // Update Servings
  servingsUpdate += RecipeModel.state.recipe.servings;
  if (servingsUpdate === 0) return;

  RecipeModel.updateServings(servingsUpdate);
  RecipeView.updateDOM(RecipeModel.state.recipe);
}

function addRecipeFormController(newRecipe: any): void {
  // Add Recipe
  RecipeModel.uploadRecipe(newRecipe);
}

function loadBookmarksController() {
  // Render bookmark list on load
  BookmarkView.render(RecipeModel.state.bookmarks);
}

function bookmarkController() {
  // Add and remove bookmarks
  const isBookmarked = RecipeModel.state.recipe.bookmarked;

  if (!isBookmarked) {
    RecipeModel.addBookmark(RecipeModel.state.recipe);
  } else {
    RecipeModel.deleteBookmark(RecipeModel.state.recipe.id!);
  }

  RecipeView.updateDOM(RecipeModel.state.recipe);
  BookmarkView.render(RecipeModel.state.bookmarks);
}

async function searchController(): Promise<void> {
  try {
    const query = SearchView.getSearchQuery();
    if (!query) return;

    ResultsView.renderSpinner();
    
    await RecipeModel.loadSearchResult(query);

    // Render Results list and Pagination Buttons
    ResultsView.render(RecipeModel.getSearchResultPerPage());
    PaginationView.render(RecipeModel.state.search);
  } catch (error) {
    ResultsView.renderErrorMsg();
  }
}

function paginationController(goToPage: number): void {
  // onButtonClick - Render next page of results
  ResultsView.render(RecipeModel.getSearchResultPerPage(goToPage));
  PaginationView.render(RecipeModel.state.search);
}

function init() {
  RecipeModel.init(); // Load Bookmarked recipes from localstorage

  AddRecipeView.onSubmitHandler(addRecipeFormController);
  BookmarkView.loadBookmarksHandler(loadBookmarksController);
  RecipeView.renderHandler(recipeController);
  RecipeView.bookmarkHandler(bookmarkController);
  SearchView.searchHandler(searchController);
  PaginationView.onClickHandler(paginationController);
  RecipeView.servingsHandler(servingsController);
  console.log(RecipeModel.state);
}

init();
