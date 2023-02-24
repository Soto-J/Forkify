import { Handler } from "../types/type";
import { View } from "./View";

class SearchView extends View {
  protected _parentEl = document.querySelector<HTMLFormElement>(".search")!;
  protected _searchInputEl =
    document.querySelector<HTMLInputElement>(".search__field")!;

  getSearchQuery(): string {
    const query = this._searchInputEl.value.trim().toLowerCase();
    this._clearInput();

    return query;
  }

  // Publisher Subscriber
  searchHandler(searchController: Handler) {
    this._parentEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      searchController();
    });
  }

  private _clearInput() {
    this._searchInputEl.value = "";
  }
}

export default new SearchView();
