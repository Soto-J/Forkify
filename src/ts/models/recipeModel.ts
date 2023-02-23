import { API_URL, RES_PER_PAGE } from "../config";
import { getJSON } from "../helper/helper";

// Will come back to interface
interface IRecipeModel {
  state?: {
    recipe: {
      id: number;
      title: string;
      publisher: string;
      sourceUrl: string;
      image: string;
      servings: number;
      cookingTime: number;
      ingredients: [{ quantity: string; unit: number; description: string }];
    };
    search: {
      query: string;
      results: [];
    };
  };

  getRecipes(hashId: string): Promise<void>;
  loadSearchResult(query: string): Promise<void>;
}

// **************************
class RecipeModel {
  state = {
    recipe: {},
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

      const recipe = this.formatRecipeKeys(data);

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

      const searchResults = this.formartSearchResultsKeys(data);

      this.state.search.results = searchResults;
    } catch (error) {
      throw error;
    }
  }

  getSearchResultPerPage(page = this.state.search.page) {
    this.state.search.page = page;

    const start = (page - 1) * this.state.search.resultsPerPage;
    const end = page * this.state.search.resultsPerPage;

    return this.state.search.results.slice(start, end);
  }

  // ************* Reformat Keys of Fetched Data ************ \\
  private formatRecipeKeys(data: any) {
    const [recipe] = Object.values(data).map((val: any) => {
      return {
        id: val.id,
        title: val.title,
        publisher: val.publisher,
        sourceUrl: val.source_url,
        image: val.image_url,
        servings: val.servings,
        cookingTime: val.cooking_time,
        ingredients: val.ingredients,
      };
    });
    return recipe;
  }

  private formartSearchResultsKeys(data: any) {
    const results = data.recipes.map((val: any) => {
      return {
        id: val.id,
        title: val.title,
        image: val.image_url,
        publisher: val.publisher,
      };
    });
    return results;
  }
}

export default new RecipeModel();
