// https://forkify-api.herokuapp.com/v2
import icons from "../img/icons.svg";
import * as Model from "./models/model";
import { RecipeModel } from "./models/ModelTest";

const recipeContainerEl = document.querySelector<HTMLDivElement>(".recipe")!;
const searchContainerEl = document.querySelector<HTMLFormElement>(".search");

async function showRecipe(): Promise<void> {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;

    renderSpinner(recipeContainerEl);

    const recipeModel = new RecipeModel();
    const state = await recipeModel.loadRecipe(hashId);
    console.log(state);
    // const { recipe } = state;
    // console.log(data);
    // const { recipe } = data.state;
    // console.log(recipe);

    // await Model.loadRecipe(hashId);
    // console.log(Model.state.recipe);

    const { recipe } = state;
    const markup = `   
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>
      
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${recipe.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>
        
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${recipe.servings}
          </span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        
        <button class="btn--round">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>
      
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(
            (ingredient) => `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>
          `
          )
          .join("")}
        </ul>
      </div>
      
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. 
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    recipeContainerEl!.innerHTML = "";
    recipeContainerEl!.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    console.log(error);
  }
}

function renderSpinner(parentEl: HTMLDivElement) {
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `
  );
}

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));

export {};
