import { Controller } from "../types/type";
import { View } from "./View";

class SearchView extends View {
  protected parentEl = document.querySelector<HTMLFormElement>(".search")!;
  protected searchInputEl =
    document.querySelector<HTMLInputElement>(".search__field")!;

  getSearchQuery(): string {
    const query = this.searchInputEl.value.trim().toLowerCase();
    this.searchInputEl.value = "";

    return query;
  }

  // Publisher Subscriber
  searchHandler(controller: Controller): void {
    this.parentEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      controller();
    });
  }
}

export default new SearchView();
