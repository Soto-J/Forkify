import { View } from "./View";

class SearchView extends View {
  private _searchFormEl = document.querySelector<HTMLFormElement>(".search")!;
  private _searchInputEl =
    document.querySelector<HTMLInputElement>(".search__field")!;

  getSearchQuery(): string {
    const query = this._searchInputEl.value.trim().toLowerCase();
    this.clearSearchInput();

    return query;
  }

  // Publisher Subscriber
  searchHandler(searchController: () => {}) {
    this._searchFormEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      searchController();
    });
  }

  private clearSearchInput() {
    this._searchInputEl.value = "";
  }
}

export default new SearchView();
