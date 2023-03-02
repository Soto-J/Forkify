import { Result } from "../types/type";
import { View } from "./View";

class ResultsView extends View {
  protected parentEl = document.querySelector<HTMLUListElement>(".results")!;
  protected errorMessage = `No recipes found for your query!`;
  protected message = ``;

  protected override generateMarkup(): string {
    this.data = this.data as Result[];
    const hashId = window.location.hash.slice(1);

    return this.data
      .map((result: any) => {
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
      })
      .join("");
  }
}

export default new ResultsView();
