import { ListView } from "../ListView";

class ResultsView extends ListView {
  protected parentEl = document.querySelector<HTMLUListElement>(".results")!;
  protected errorMessage = `No recipes found for your query!`;
}

export default new ResultsView();
