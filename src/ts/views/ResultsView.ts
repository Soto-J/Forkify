import { View } from "./View";

class ResultsView extends View {
  protected _parentEl = document.querySelector(".results")!;
}

export default new ResultsView();
