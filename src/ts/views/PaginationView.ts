import { View } from "./View";

class PaginationView extends View {
  protected parentEl = document.querySelector<HTMLDivElement>(".pagination")!;

  onClickHandler(controller: any) {
    this.parentEl.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      // only trigger if element has ".btn--inline"
      const btn: HTMLButtonElement = (e.target as HTMLButtonElement).closest(
        ".btn--inline"
      )!;
      if (!btn) return;

      const goToPage = Number(btn.dataset.goToPage);
      controller(goToPage);
    });
  }

  protected generateMarkup(): string {
    const currentPage = this.data.page;
    const numOfPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );
    console.log(`# of Pages: ${numOfPages}`);
    console.log(`current Page: ${currentPage}`);

    if (currentPage === 1 && numOfPages > 1) {
      return this._nextPageBtnMarkup(currentPage);
    }
    
    if (currentPage === numOfPages && numOfPages > 1) {
      return this._prevPageBtnMarkup(currentPage);
    }

    return this._prevAndNextBtnMarkup(currentPage);
  }

  // ********** HTML Button Markups *********** \\
  private _prevAndNextBtnMarkup(currentPage: number): string {
    return (
      this._prevPageBtnMarkup(currentPage) +
      this._nextPageBtnMarkup(currentPage)
    );
  }

  private _prevPageBtnMarkup(currentPage: number): string {
    return `
      <button 
        class="btn--inline pagination__btn--prev"
        data-go-to-page="${currentPage - 1}" 
      >
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }

  private _nextPageBtnMarkup(currentPage: number): string {
    return `
      <button 
        class="btn--inline pagination__btn--next"
        data-go-to-page="${currentPage + 1}"
      >
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
