import { Search } from "../../types/type";
import { View } from "../View";
import Icons from "../../../img/icons.svg";

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

  protected override generateMarkup(): string {
    this.data = this.data as Search;

    const currentPage = this.data.page;
    const numOfPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

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
          <use href="${Icons}#icon-arrow-left"></use>
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
            <use href="${Icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
