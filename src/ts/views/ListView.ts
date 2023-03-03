import { Recipe, Result } from "../types/type";
import { View } from "./View";

export class ListView extends View {
  protected override generateMarkup(): string {
    return (this.data as Recipe[] | Result[]).map(this._listMarkup).join("");
  }

  private _listMarkup(result: Recipe | Result): string {
    const hashId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a 
          class="preview__link ${
            hashId === String(result.id) ? "preview__link--active" : ""
          }" 
          href="#${result.id}"
        >
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}
