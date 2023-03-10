import { Recipe, Result } from "../types/type";
import { View } from "./View";

export class ListView extends View {
  protected override generateMarkup(): string {
    return (this.data as Recipe[] | Result[]).map(this._listMarkup).join("");
  }

  private _listMarkup(data: Recipe | Result): string {
    const hashId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a 
          class="preview__link ${
            hashId === String(data.id) ? "preview__link--active" : ""
          }" 
          href="#${data.id}"
        >
          <figure class="preview__fig">
            <img src="${data.image}" alt="${data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
            <div class="preview__user-generated ${!data.key && "hidden"}">
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
