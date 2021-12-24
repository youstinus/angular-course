import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                const recipes = this.recipeService.getRecipes();
                return this.http
                    .put(
                        'https://ng-guide-b2e50.firebaseio.com/recipes.json',
                        recipes,
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    )
            })).subscribe(res => {
                console.log(res)
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-guide-b2e50.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }
                ),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }))
    }

    // methods for using cloud firestore instead of realtime db
    /*storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        for (let recipe of recipes) {
            let wa = Object.assign({}, recipe)
            delete wa.ingredients
            if (recipe.id === '') {
                this.firebase
                    .collection('recipes7')
                    .add(wa).then(res => {
                        recipe.id = res.id
                        this.storeIngredients(recipe)
                    })
            } else {
                this.firebase
                    .collection('recipes7')
                    .doc(recipe.id)
                    .update(wa).then(res => {
                        this.storeIngredients(recipe)
                    })
            }
        }
    }

    storeIngredients(recipe: Recipe) {
        for (let ingredient of recipe.ingredients) {
            if (ingredient.id === '') {
                this.firebase
                    .collection('recipes7')
                    .doc(recipe.id)
                    .collection('ingredients')
                    .add(Object.assign({}, ingredient))
            } else {
                this.firebase
                    .collection('recipes7')
                    .doc(recipe.id)
                    .collection('ingredients')
                    .doc(ingredient.id)
                    .update(Object.assign({}, ingredient))
            }
        }
    }

    // change get ingredients method when maybe one recipe is selected
    getRecipes() {
        this.firebase.collection('recipes7')
            .get()
            .subscribe(res => {
                this.recipeService.setRecipes(res.docs.map(x => {
                    return { id: x.id, name: x.data().name, description: x.data().description, imagePath: x.data().imagePath, ingredients: [] }
                }))
                for (let rec of res.docs) {
                    if (rec.data().ingredients != null) {
                        this.getIngredientsByIds(rec.id, rec.data().ingredients)
                    }
                }
            }
            )
    }

    getIngredientsByIds(recipeId: string, ingredientIds: string[]) {
        for (let ingId of ingredientIds) {
            this.firebase
                .doc(ingId)
                .get()
                .subscribe(res => {
                    this.recipeService.addIngredient(recipeId, new Ingredient(res.id, res.data().name, res.data().amount))
                })
        }
    }*/
}