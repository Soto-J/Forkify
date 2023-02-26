import { Controller } from "../types/type";
import { View } from "./View";

class SearchView extends View {
  protected _parentEl = document.querySelector<HTMLFormElement>(".search")!;
  protected _searchInputEl =
    document.querySelector<HTMLInputElement>(".search__field")!;

  getSearchQuery(): string {
    const query = this._searchInputEl.value.trim().toLowerCase();
    this._searchInputEl.value = "";

    return query;
  }

  // Publisher Subscriber
  searchHandler(controller: Controller) {
    this._parentEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      controller();
    });
  }
}

export default new SearchView();
