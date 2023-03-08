import { View } from "../View";

class AddRecipeView extends View {
  protected parentEl = <HTMLFormElement>document.querySelector(".upload");

  private _overlay = <HTMLDivElement>document.querySelector(".overlay");
  private _closeModalBtn = document.querySelector(".btn--close-modal")!;
  private _openModalBtn = <HTMLButtonElement>(
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
      // controller(dataArr);
    });
  }

  private _showFormHandler(): void {
    this._openModalBtn.addEventListener("click", this._toggleWindow);
  }

  private _hideFormHandler(): void {
    this._closeModalBtn.addEventListener("click", this._toggleWindow);
    this._overlay.addEventListener("click", this._toggleWindow);
  }

  private _toggleWindow = (): void => {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  };

  protected override generateMarkup(): string {
    return "";
  }
}

export default new AddRecipeView();
