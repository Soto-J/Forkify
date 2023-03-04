import { ListView } from "../ListView";

class BookmarkView extends ListView {
  protected parentEl = <HTMLUListElement>(
    document.querySelector(".bookmarks__list")
  );
  protected errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

  loadBookmarksHandler(controller: any) {
    window.addEventListener("load", controller);
  }
}

export default new BookmarkView();
