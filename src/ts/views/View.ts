export class View {
  protected _recipeData: any;
  protected _parentEl: any;
  protected _message!: string;
  protected _errorMessage!: string;

  set render(recipeData: {}) {
    this._recipeData = recipeData;
    // console.log(this._recipeData);
    const markup = this.generateMarkup();
    
    this.removeInnerHTML();
    this._parentEl!.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner(): void {
    this.removeInnerHTML();

    const spinnerMarkup = this.spinnerMarkup();
    
    this._parentEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  renderMessage(message = this._message): void {
    this.removeInnerHTML();

    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      this.messageMarkup(message)
    );
  }

  renderErrorMsg(errorMsg = this._errorMessage): void {
    this.removeInnerHTML();

    this._parentEl.insertAdjacentHTML("afterbegin", this.errorMarkup(errorMsg));
  }

  protected removeInnerHTML(): void {
    this._parentEl!.innerHTML = "";
  }

  protected spinnerMarkup(): string {
    return `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
  }

  protected messageMarkup(message = this._message): string {
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

  protected errorMarkup(errorMsg: string): string {
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

  protected generateMarkup(): string {
    throw new Error("Method not implemented.");
  }
}
