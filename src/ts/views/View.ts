import { Recipe, Result, Search } from "../types/type";
import { updateDOMHelper } from "../helper/helper";

export type Data = Result[] | Recipe | Recipe[] | Search;

interface IView {
  render(data: Data): void;
  updateDOM(data: Data): void;
  renderSpinner(): void;
  renderMessage(message: string): void;
  renderErrorMsg(errorMsg: string): void;
}

export class View implements IView {
  protected data?: Data;
  protected parentEl: any;
  protected message!: string;
  protected errorMessage!: string;

  render(data: Data): void {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderErrorMsg();
    }

    this.data = data;
    // console.log("View", data);

    const markup = this.generateMarkup();
    this.parentEl!.innerHTML = "";
    this.parentEl!.insertAdjacentHTML("afterbegin", markup);
  }

  updateDOM(data: Data): void {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderErrorMsg();
    }

    this.data = data;

    // current Snapshot of DOM
    const currentElements: NodeListOf<Element> =
      this.parentEl.querySelectorAll("*");
    // New Snapshot of virtual DOM with updated servings
    const newMarkup = this.generateMarkup();
    const newDOM: DocumentFragment = document
      .createRange()
      .createContextualFragment(newMarkup);
    const newElements: NodeListOf<Element> = newDOM.querySelectorAll("*");

    updateDOMHelper(currentElements, newElements);
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
