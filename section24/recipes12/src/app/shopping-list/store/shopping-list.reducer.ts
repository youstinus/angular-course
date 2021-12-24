import { Ingredient } from '../../models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[]
    editedIngredientIndex: number
    editedIngredient: Ingredient
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient('Salt', 5),
        new Ingredient('Tomato', 2),
    ],
    editedIngredientIndex: -1,
    editedIngredient: null,
}

export function shoppingListReducer(
    state: State = initialState, action: ShoppingListActions.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, //optional. good practice
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, //optional. good practice
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updatedIngredient = {
                ...ingredient, // optional
                ...action.payload as Ingredient
            }
            const updatedIngredients = [
                ...state.ingredients
            ]
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient
            return {
                ...state, //optional. good practice
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null,
            }
        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state, //optional. good practice
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex
                }),
                editedIngredientIndex: -1,
                editedIngredient: null,
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload as number]}
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null,
            }
        default:
            return state;
    }
}