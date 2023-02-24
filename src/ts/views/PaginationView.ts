import { View } from "./View";

class PaginationView extends View {
  protected parentEl = document.querySelector<HTMLDivElement>(".pagination")!;

  onClickHandler() {
    this.parentEl.addEventListener("click", (e) => {
      e.preventDefault();

      const target = (e.target as HTMLElement).closest(".btn--inline");
      if (!target) return;

      console.log(target);
      
      console.log(target.className);
    });
  }

  protected generateMarkup(): string {
    const currentPage = this.data.page;
    const numOfPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    console.log(`# Pages = ${numOfPages}`);
    console.log(`current Page = ${currentPage}`);

    if (currentPage === 1 && numOfPages > 1) {
      return this._nextPageBtnMarkup(currentPage);
    } else if (currentPage === numOfPages && numOfPages > 1) {
      return this._prevPageBtnMarkup(currentPage);
    } else {
      return this._prevAndNextBtnMarkup(currentPage);
    }
  }

  // ********** HTML Button Markups *********** \\
  private _prevAndNextBtnMarkup(currentPage: number): string {
    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  private _prevPageBtnMarkup(currentPage: number): string {
    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }

  private _nextPageBtnMarkup(currentPage: number): string {
    return `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
