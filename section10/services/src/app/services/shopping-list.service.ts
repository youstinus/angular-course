import {Ingredient} from '../models/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('salt', 5),
    new Ingredient('tomato', 2),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    const ingredients = this.getIngredients();
    this.ingredientsChanged.emit(ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    const newIngredients = this.getIngredients();
    this.ingredientsChanged.emit(newIngredients);

    /*for (const ingredient of ingredients) {
      this.addIngredient(ingredient);
    }*/
  }
}
