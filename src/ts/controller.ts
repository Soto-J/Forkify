// // https://forkify-api.herokuapp.com/v2
import icons from "../img/icons.svg";
import * as Model from "./models/model";
import RecipeModel, { Recipe } from "./models/recipeModel";
import RecipeView from "./views/RecipeView";

async function recipeController(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;
    RecipeView.renderSpinner();

    // ********* Get recipe data Without Class ********//
    // await Model.loadRecipe(hashId);
    // RecipeView.render = <Recipe>Model.state.recipe;

    // ****** Get recipe data with Class ******** //
    await RecipeModel.getRecipes(hashId);
    // Display recipe
    RecipeView.render = RecipeModel.state.recipe;
  } catch (error) {
    console.log(error);
  }
}

function init() {
  RecipeView.renderHandler(recipeController);
}

init();
