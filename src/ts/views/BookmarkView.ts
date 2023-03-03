import { Recipe } from "../types/type";
import { View } from "./View";

class BookmarkView extends View {
  protected parentEl = <HTMLUListElement>(
    document.querySelector(".bookmarks__list")
  );
  protected errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  protected message = ``;

  protected override generateMarkup(): string {
    this.data = this.data as Recipe[];

    return this.data.map(this._bookmarkList).join("");
  }

  private _bookmarkList(result: Recipe): string {
    const hashId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a 
          class="preview__link ${
            hashId === result.id ? "preview__link--active" : ""
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

export default new BookmarkView();
