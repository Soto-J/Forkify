import { Result } from "../../types/type";
import { PreviewView } from "../PreviewView";

class ResultsView extends PreviewView {
  protected parentEl = document.querySelector<HTMLUListElement>(".results")!;
  protected errorMessage = `No recipes found for your query!`;
  protected message = ``;

  protected override generateMarkup(): string {
    this.data = this.data as Result[];

    return super.generateMarkup();
  }
}

export default new ResultsView();
