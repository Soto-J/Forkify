import { IRecipeModel, State, Result, Ingredient, Recipe } from "../types/type";
import { API_KEY, API_URL, RES_PER_PAGE } from "../config";
import { AJAX } from "../helper/helper";

type ResponseRecipe = {
  recipe: {
    cooking_time: number;
    id: string;
    image_url: string;
    ingredients: Ingredient[];
    publisher: string;
    servings: number;
    source_url: string;
    title: string;
  };
};
type ResultRecipe = {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
};
type ResponseRecipeList = {
  recipes: ResultRecipe[];
};
type PostRecipe = {
  cooking_time: number;
  createdAt?: string;
  id?: string;
  image_url: string;
  ingredients: Ingredient[];
  key?: string;
  publisher: string;
  servings: number;
  source_url: string;
  title: string;
};

type NewRecipe = {
  cookingTime: string;
  image: string;
  "ingredient-1": string;
  "ingredient-2": string;
  "ingredient-3": string;
  "ingredient-4": string;
  "ingredient-5": string;
  "ingredient-6": string;
  publisher: string;
  servings: string;
  sourceUrl: string;
  title: string;
};

//////////////////
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
      // GET
      const data = await AJAX<ResponseRecipe>(
        `${API_URL}${hashId}?key=${API_KEY}`
      );
      this.state.recipe = this._createRecipeObj(data);

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
      // GET
      const data = await AJAX<ResponseRecipeList>(
        `${API_URL}?search=${query}&key=${API_KEY}`
      );

      const searchResults = this._creaSearchResultArray<Result>(data);

      this.state.search.results = searchResults;
      this.state.search.page = 1;
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

  async uploadRecipe(newRecipe: NewRecipe) {
    try {
      console.log("NEW", newRecipe);
      const filteredInput = Object.entries(newRecipe).filter(
        (entry) => entry[0].includes("ingredient") && entry[1] !== ""
      );
      console.log("FilteredInput", filteredInput);

      const ingredientsInput = filteredInput.map((ing) => {
        const ingredients = ing[1].split(",").map((val) => val.trim());

        if (ingredients.length !== 3) {
          throw new Error("Wrong ingredient! Please use the correct format :)");
        }

        const [quantity, unit, description] = ingredients;

        return {
          quantity: Number(quantity),
          unit: unit,
          description: description || null,
        };
      });
      console.log("IngredientsInput", ingredientsInput);

      // Reformat keys to meet POST requirement
      const recipe = this._createPostRecipeObj(newRecipe, ingredientsInput);

      const data = await AJAX<PostRecipe>(`${API_URL}?key=${API_KEY}`, recipe);
      console.log("upload", data);

      this.state.recipe = this._createRecipeObj<Recipe>(data);
      this.addBookmark(this.state.recipe);
    } catch (error) {
      throw error;
    }
  }

  // ************* Reformat Keys of Fetched Data ************ \\
  private _createRecipeObj<T>(recipe: any): T {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
  }

  private _creaSearchResultArray<T>(data: any): T[] {
    return data.map((result: any) => {
      return {
        id: result.id,
        title: result.title,
        image: result.image_url,
        publisher: result.publisher,
        ...(result.key && { key: result.key }),
      };
    });
  }

  private _createPostRecipeObj(
    newRecipe: NewRecipe,
    ingredients: Ingredient[]
  ): PostRecipe {
    return {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: Number(newRecipe.servings),
      cooking_time: Number(newRecipe.cookingTime),
      ingredients,
    };
  }
}

export default new RecipeModel();
