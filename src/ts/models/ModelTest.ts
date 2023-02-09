import { Recipe, State } from "../types/types";

export class RecipeModel {
  state!: State;

  constructor() {}

  async loadRecipe(hashId: string) {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${hashId}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { data } = await response.json();

      this.state = data;
      return this.state;
      // console.log("State:", this.state);
    } catch (error) {
      console.log();
    }
  }
}
