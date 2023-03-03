import { Data, View } from "./View";

export class PreviewView extends View {
  protected override generateMarkup(): string {
    return (this.data as any).map(this._bookmarkList).join("");
  }

  private _bookmarkList(result: any): string {
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
