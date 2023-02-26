export class View {
  protected data: any;
  protected parentEl: any;
  protected message!: string;
  protected errorMessage!: string;

  render(data: any) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderErrorMsg();
    }

    this.data = data;

    const markup = this.generateMarkup();
    this.parentEl!.innerHTML = "";
    this.parentEl!.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner(): void {
    this.parentEl!.innerHTML = "";

    const spinnerMarkup = this.spinnerMarkup();
    this.parentEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  renderMessage(message = this.message): void {
    this.parentEl!.innerHTML = "";
    this.parentEl.insertAdjacentHTML("afterbegin", this.messageMarkup(message));
  }

  renderErrorMsg(errorMsg = this.errorMessage): void {
    this.parentEl!.innerHTML = "";
    this.parentEl.insertAdjacentHTML("afterbegin", this.errorMarkup(errorMsg));
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

  protected messageMarkup(message = this.message): string {
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
