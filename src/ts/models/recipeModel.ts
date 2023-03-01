import { API_URL, RES_PER_PAGE } from "../config";
import { getJSON } from "../helper/helper";

export interface IRecipeModel {
  state?: State;

  getRecipe(hashId: string): Promise<void>;
  loadSearchResult(query: string): Promise<void>;
  getSearchResultPerPage(page: number): Ingredient[];
  updateServings(newServings: number): void;
}

export type State = {
  recipe?: Recipe;
  search?: Search;
};

export type Recipe = {
  id?: number;
  title?: string;
  publisher?: string;
  sourceUrl?: string;
  image?: string;
  servings: number;
  cookingTime?: number;
  ingredients?: Ingredient[];
};

export type Search = {
  query?: string;
  results?: Result[];
};

export type Ingredient = {
  quantity?: number | null;
  unit?: number;
  description?: string;
};
export type Result = {
  id?: number;
  title?: string;
  image?: string;
  publisher?: string;
};

// **************************
class RecipeModel implements IRecipeModel {
  state = {
    recipe: {
      servings: 0,
      ingredients: [],
    },
    search: {
      query: "",
      results: [],
      page: 1,
      resultsPerPage: RES_PER_PAGE,
    },
  };

  async getRecipe(hashId: string): Promise<void> {
    try {
      const data = await getJSON(`${API_URL}${hashId}`);
      const recipe = this._formatRecipeKeys(data) as Recipe;

      this.state.recipe = recipe;
    } catch (error) {
      throw error;
    }
  }

  async loadSearchResult(query: string): Promise<void> {
    try {
      this.state.search.query = query;

      const data = await getJSON(`${API_URL}?search=${query}`);
      console.log(data);
      const searchResults = this._formartSearchResultKeys(data) as Result[];

      this.state.search.results = searchResults;
    } catch (error) {
      throw error;
    }
  }

  getSearchResultPerPage(page = this.state.search.page): Ingredient[] {
    this.state.search.page = page;

    const start = (page - 1) * this.state.search.resultsPerPage;
    const end = page * this.state.search.resultsPerPage;

    return this.state.search.results.slice(start, end);
  }

  updateServings(newServings: number) {
    console.log(`Update to: ${newServings}`);
    this.state.recipe.ingredients.forEach((ing: any) => {
      ing.quantity = (ing.quantity * newServings) / this.state.recipe.servings!;
    });

    this.state.recipe.servings = newServings;
    console.log(this.state);
  }

  // ************* Reformat Keys of Fetched Data ************ \\
  private _formatRecipeKeys(data: any): Recipe {
    const recipe = Object.assign(
      {},
      {
        id: data.id,
        title: data.title,
        publisher: data.publisher,
        sourceUrl: data.source_url,
        image: data.image_url,
        servings: data.servings,
        cookingTime: data.cooking_time,
        ingredients: data.ingredients,
      }
    );
    console.log("recipe", recipe);

    return recipe;
  }

  private _formartSearchResultKeys(data: any) {
    return data.recipes.map((val: any) => {
      return {
        id: val.id,
        title: val.title,
        image: val.image_url,
        publisher: val.publisher,
      };
    });
  }
}

export default new RecipeModel();
