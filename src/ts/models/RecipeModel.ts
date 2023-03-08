import { IRecipeModel, State, Result, Ingredient, Recipe } from "../types/type";
import { API_URL, RES_PER_PAGE } from "../config";
import { getJSON } from "../helper/helper";

class RecipeModel implements IRecipeModel {
  state: State = {
    recipe: {
      servings: 0,
      ingredients: [],
      bookmarked: false,
    },
    search: {
      query: "",
      results: [],
      page: 1,
      resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
  };

  init() {
    this.state.bookmarks = JSON.parse(localStorage.getItem("bookmarks")!) || [];
  }

  async getRecipe(hashId: string): Promise<void> {
    try {
      const data = await getJSON(`${API_URL}${hashId}`);
      this.state.recipe = this._formatRecipeKeys(data);

      const isBookmarked = this.state.bookmarks.some(
        (bookmark: any) => bookmark.id === hashId
      );

      this.state.recipe.bookmarked = isBookmarked;
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
    this.state.recipe.ingredients!.forEach((ing: Ingredient) => {
      ing.quantity = (ing.quantity * newServings) / this.state.recipe.servings!;
    });

    this.state.recipe.servings = newServings;
    console.log(this.state);
  }

  addBookmark(recipe: Recipe): void {
    this.state.recipe.bookmarked = true;
    this.state.bookmarks.push(recipe);

    localStorage.setItem("bookmarks", JSON.stringify(this.state.bookmarks));
  }

  deleteBookmark(id: number): void {
    this.state.recipe.bookmarked = false;
    this.state.bookmarks = this.state.bookmarks.filter(
      (recipe) => recipe.id !== id
    );

    localStorage.setItem("bookmarks", JSON.stringify(this.state.bookmarks));
  }

  // private _persistBookmarks() {
  //   localStorage.setItem("bookmarks", JSON.stringify(this.state.bookmarks));
  // }
  async uploadRecipe(newRecipe: any) {
    console.log("New Recipe:", newRecipe);

    const filteredInput = Object.entries(newRecipe).filter(
      (entry: any) => entry[0].includes("ingredient") && entry[1] !== ""
    );
    console.log("Filtered", filteredInput);

    const ingredientsInput = filteredInput.map((ing: any) => {
      const ingredients = ing[1].replaceAll("", " ").split(",");
      if (ingredients.length !== 3) {
        throw new Error("Wrong ingredient! Please use the correct format :)");
      }

      const [quantity, unit, description] = ingredients;

      return {
        quantity: Number(quantity),
        unit: Number(unit) || null,
        description: description || null,
      };
    });
    console.log(ingredientsInput);
  }

  // ************* Reformat Keys of Fetched Data ************ \\
  private _formatRecipeKeys(data: any): Recipe {
    return {
      id: data.id,
      title: data.title,
      publisher: data.publisher,
      sourceUrl: data.source_url,
      image: data.image_url,
      servings: data.servings,
      cookingTime: data.cooking_time,
      ingredients: data.ingredients,
    };
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
