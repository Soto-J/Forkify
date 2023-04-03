export interface IRecipeModel {
  state: State;

  getRecipe(hashId: string): Promise<void>;
  loadSearchResult(query: string): Promise<void>;
  getSearchResultPerPage(page: number): Result[];
  updateServings(newServings: number): void;
  addBookmark(recipe: Recipe): void;
  deleteBookmark(id: number): void;
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
  key?: string;
};

export type Search = {
  query: string;
  results: Result[];
  page: number;
  resultsPerPage: number;
};

export type Ingredient = {
  quantity: number;
  unit?: string;
  description: string | null;
};
export type Result = {
  id: number;
  title: string;
  image: string;
  publisher: string;
  key?: string;
};

export type Handler = () => {};
export type Controller = () => {};
