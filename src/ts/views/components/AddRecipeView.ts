import { View } from "../View";
import Icons from "../../../img/icons.svg";

class AddRecipeView extends View {
  protected parentEl = <HTMLFormElement>document.querySelector(".upload");
  protected successMessage = "Success! Recipe was uploaded!";

  private _overlay = <HTMLDivElement>document.querySelector(".overlay");
  private _closeFormBtn = document.querySelector(".btn--close-modal")!;
  private _openFormBtn = <HTMLButtonElement>(
    document.querySelector(".nav__btn--add-recipe")
  );
  private _window = <HTMLDivElement>(
    document.querySelector(".add-recipe-window")
  );

  constructor() {
    super();
    this._showFormHandler();
    this._hideFormHandler();
  }

  onSubmitHandler(controller: any) {
    this.parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(this.parentEl);
      const dataObj = Object.fromEntries(formData);
      const dataArr = [...new FormData(this.parentEl)];

      controller(dataObj);
    });
  }

  toggleForm = (): void => {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  };

  private _showFormHandler(): void {
    this._openFormBtn.addEventListener("click", this.toggleForm);
  }

  private _hideFormHandler(): void {
    this._closeFormBtn.addEventListener("click", this.toggleForm);
    this._overlay.addEventListener("click", this.toggleForm);
  }

  protected override generateMarkup(): string {
    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${Icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;
  }
}

export default new AddRecipeView();
