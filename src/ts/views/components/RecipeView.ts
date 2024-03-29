import { Controller, Ingredient, Recipe } from "../../types/type";
import { View } from "../View";
import fracty from "fracty";
import icons from "../../../img/icons.svg";

class RecipeView extends View {
  protected parentEl = document.querySelector<HTMLDivElement>(".recipe")!;
  protected errorMessage = `We could not find that recipe. Please try another one!`;
  protected successMessage = `Start by searching for a recipe or an ingredient. Have fun!`;

  // Publisher Subscriber Pattern - init
  renderHandler(recipeController: Controller): void {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, recipeController)
    );
  }

  servingsHandler(controller: any): void {
    this.parentEl.addEventListener("click", (e: MouseEvent) => {
      const btn: HTMLButtonElement = (e.target as HTMLButtonElement).closest(
        ".btn--servings-update"
      )!;

      if (!btn) return;

      const servingsUpdate = Number(btn.dataset.servingsUpdate);
      controller(servingsUpdate);
    });
  }

  bookmarkHandler(controller: any) {
    this.parentEl.addEventListener("click", (e) => {
      const bookmarkBtn = (e.target as HTMLButtonElement).closest(
        ".btn--bookmark"
      );
      if (!bookmarkBtn) return;
      controller();
    });
  }

  // *************** HTML markUp ******************* \\
  protected override generateMarkup(): string {
    this.data = this.data as Recipe;

    const showBookmarkIcon = this.data.bookmarked ? "-fill" : "";

    return `
      <figure class="recipe__fig">
        <img 
          src="${this.data.image}" 
          alt="${this.data.title}" 
          class="recipe__img" 
        />
        <h1 class="recipe__title">
          <span>${this.data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${this.data.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${this.data.servings}
          </span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button 
              class="btn--tiny btn--servings-update"
              data-servings-update="-1"
            >
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button 
              class="btn--tiny btn--servings-update"
              data-servings-update="1"
            >
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${!this.data.key && "hidden"}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>

        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${showBookmarkIcon}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._ingredientsList()}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.data.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  private _ingredientsList(): string {
    this.data = this.data as Recipe;

    return `${this.data.ingredients
      .map(
        (ingredient: Ingredient) => `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">
            ${fracty(ingredient.quantity)}
          </div>
          <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.description}
          </div>
        </li>
        `
      )
      .join("")}`;
  }
}

export default new RecipeView();
