import { View } from "./View";

class BookmarkView extends View {
  protected parentEl = <HTMLUListElement>(
    document.querySelector(".bookmarks__list")
  );
  protected errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  protected message = ``;

  protected override generateMarkup() {
    return `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${this.message}</p>
      </div>
    `;
  }
  bookmarkListMarkup() {
    return `
      <li class="preview">
        <a class="preview__link" href="#23456">
          <figure class="preview__fig">
            <img src="src/img/test-1.jpg" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              Pasta with Tomato Cream ...
            </h4>
            <p class="preview__publisher">The Pioneer Woman</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new BookmarkView();
