import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css'],
  providers: [ApiService]
})
export class RecipesComponent {
  api: ApiService;
  recipe: any = [];
  recipes: any = [];

  constructor(api: ApiService) {
    this.api = api;
    this.loadDailyRecipe();
    this.loadRecipes();
  }

  loadDailyRecipe() {
    this.api.getDailyRecipe().subscribe(data => {
      this.recipe = data;
    });
  }

  loadRecipes() {
    this.api.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  saveRecipe(recipe) {
    this.api.addNewRecipe(recipe.title, recipe.link).subscribe(data => {
      this.loadRecipes();
    });
  }
}
