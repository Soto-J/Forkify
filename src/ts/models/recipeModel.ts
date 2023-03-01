import { API_URL, RES_PER_PAGE } from "../config";
import { getJSON } from "../helper/helper";

export interface IRecipeModel {
  state: State;

  getRecipe(hashId: string): Promise<void>;
  loadSearchResult(query: string): Promise<void>;
  getSearchResultPerPage(page: number): Result[];
  updateServings(newServings: number): void;
  addBookmark(recipe: Recipe): void;
}

export type State = {
  recipe: Recipe;
  search: Search;
  bookmarks: Recipe[];
};

export type Recipe = {
  id?: number;
  title?: string;
  publisher?: string;
  sourceUrl?: string;
  image?: string;
  servings: number;
  cookingTime?: number;
  ingredients: Ingredient[];
  bookmarked?: boolean;
};

export type Search = {
  query: string;
  results: Result[];
  page: number;
  resultsPerPage: number;
};

export type Ingredient = {
  quantity: number;
  unit: number;
  description: string;
};
export type Result = {
  id: number;
  title: string;
  image: string;
  publisher: string;
};

// **************************
class RecipeModel implements IRecipeModel {
  state: State = {
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
    bookmarks: [],
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

      const searchResults = this._formartSearchResultKeys(data) as Result[];

      this.state.search.results = searchResults;
      this.state.search.page = 1;
      console.log(this.state);
    } catch (error) {
      throw error;
    }
  }

  getSearchResultPerPage(page = this.state.search.page): Result[] {
    this.state.search.page = page;

    const start = (page - 1) * this.state.search.resultsPerPage;
    const end = page * this.state.search.resultsPerPage;

    return this.state.search.results.slice(start, end);
  }

  updateServings(newServings: number): void {
    console.log(`Update to: ${newServings}`);
    this.state.recipe.ingredients!.forEach((ing: Ingredient) => {
      ing.quantity = (ing.quantity * newServings) / this.state.recipe.servings!;
    });

    this.state.recipe.servings = newServings;
    console.log(this.state);
  }

  addBookmark(recipe: Recipe): void {
    // Add bookmark
    this.state.bookmarks.push(recipe);

    if (recipe.id === this.state.recipe.id) {
      this.state.recipe.bookmarked = true;
    }
  }

  // ************* Reformat Keys of Fetched Data ************ \\
  private _formatRecipeKeys(data: any): Recipe {
    return Object.assign(
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
  }

  private _formartSearchResultKeys(data: any): Result[] {
    return data.map((val: any) => {
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
