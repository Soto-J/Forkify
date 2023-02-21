import Fraction from "fraction.js";
import fracty from "fracty";

type Handler = () => {};

// **********
class RecipeView {
  private _recipeEl = document.querySelector<HTMLDivElement>(".recipe")!;
  private _recipeData: any;
  private _message = `Start by searching for a recipe or an ingredient. Have fun!`;
  private _errorMessage = `We could not find that recipe. Please try another one!`;

  set render(recipeData: {}) {
    this._recipeData = recipeData;
    // console.log(this._recipeData);

    const markup = this.generateMarkup();
    this.removeInnerHTML();
    this._recipeEl!.insertAdjacentHTML("afterbegin", markup);
  }

  // Publisher Subscriber Pattern - init
  renderHandler(handler: Handler): void {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  renderSpinner(): void {
    this.removeInnerHTML();

    const spinnerMarkup = this.spinnerMarkup();
    this._recipeEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  renderMessage(message = this._message): void {
    this.removeInnerHTML();

    this._recipeEl.insertAdjacentHTML(
      "afterbegin",
      this.messageMarkup(message)
    );
  }

  renderErrorMsg(errorMsg = this._errorMessage): void {
    this.removeInnerHTML();

    this._recipeEl.insertAdjacentHTML("afterbegin", this.errorMarkup(errorMsg));
  }

  // ********** HTML Markups  ************* //
  private removeInnerHTML() {
    this._recipeEl!.innerHTML = "";
  }

  private spinnerMarkup(): string {
    return `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
  }

  private generateMarkup(): string {
    return `
      <figure class="recipe__fig">
        <img 
          src="${this._recipeData.image}" 
          alt="${this._recipeData.title}" 
          class="recipe__img" 
        />
        <h1 class="recipe__title">
          <span>${this._recipeData.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${this._recipeData.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${this._recipeData.servings}
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
          ${this.ingredientsList()}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._recipeData.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._recipeData.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  private ingredientsList(): string {
    return `${this._recipeData.ingredients
      .map(
        (ingredient: any) => `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="src/img/icons.svg#icon-check"></use>
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

  private messageMarkup(message = this._message): string {
    return `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
  }

  private errorMarkup(errorMsg: string): string {
    return `
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMsg}</p>
      </div> 
    `;
  }
}

export default new RecipeView();
