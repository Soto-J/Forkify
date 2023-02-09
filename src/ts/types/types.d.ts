type Recipe = {
  id: number;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: [{ quantity: string; unit: number; description: string }];
};

interface State {
  recipe: Recipe;
}

export type { Recipe, State };
