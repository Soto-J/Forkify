class SearchView {
  private _searchFormEl = document.querySelector<HTMLFormElement>(".search")!;
  private _searchInputEl =
    document.querySelector<HTMLInputElement>(".search__field")!;

  getQuery(): string {
    const value = this._searchInputEl.value.trim();
    return value;
  }

  // Publisher Subscriber
  searchHandler(handler: () => {}) {
    this._searchFormEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
