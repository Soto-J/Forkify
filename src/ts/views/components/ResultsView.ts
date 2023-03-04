import { ListView } from "../ListView";

class ResultsView extends ListView {
  protected parentEl = document.querySelector<HTMLUListElement>(".results")!;
  protected errorMessage = `No recipes found for your query! Please try again.`;
}

export default new ResultsView();
