import { Recipe } from "../../types/type";
import { PreviewView } from "../PreviewView";

class BookmarkView extends PreviewView {
  protected parentEl = <HTMLUListElement>(
    document.querySelector(".bookmarks__list")
  );
  protected errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  protected message = ``;

  protected override generateMarkup(): string {
    this.data = this.data as Recipe[];

    return super.generateMarkup();
  }
}

export default new BookmarkView();
