import { View } from "./View";

class ResultsView extends View {
  protected _parentEl = document.querySelector(".results")!;
  protected _errorMessage = `No recipes found for your query!`;
  protected _message = ``;

  protected override generateMarkup() {
    console.log(this._data);

    return this._data
      .map((result: any) => {
        //  preview__link--active
        return `                    
          <li class="preview">
            <a class="preview__link" href="#${result.id}">
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
