import { API_URL } from "../config";
import { getJSON } from "../helper/helper";

interface IRecipeModel {
  state: State;
  getRecipes: (hashId: string) => Promise<void>;
}
export type State = { recipe: Recipe };
export type Recipe = {
  id: number;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: [{ quantity: string; unit: number; description: string }];
};

// **********
class RecipeModel implements IRecipeModel {
  state!: State;

  async getRecipes(hashId: string): Promise<void> {
    try {
      const data = await getJSON(`${API_URL}/${hashId}`);

      // console.log(data);
      this.state = this.reformatKeys(data);
    } catch (error) {
      console.log(`recipeModel😎: ${error}`);
    }
  }

  private reformatKeys(data: {}): State {
    const [newState] = Object.values(data).map((val: any) => {
      return {
        recipe: {
          id: val.id,
          title: val.title,
          publisher: val.publisher,
          sourceUrl: val.source_url,
          image: val.image_url,
          servings: val.servings,
          cookingTime: val.cooking_time,
          ingredients: val.ingredients,
        },
      };
    });
    return newState;
  }
}

export default new RecipeModel();
// Export RecipeModel created.

// export type State = {
//   recipe: {
//     id: number;
//     title: string;
//     publisher: string;
//     sourceUrl: string;
//     image: string;
//     servings: number;
//     cookingTime: number;
//     ingredients: [{ quantity: string; unit: number; description: string }];
//   };
// };
