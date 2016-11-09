import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css'],
  providers: [ApiService]
})
export class RecipesComponent {
  recipe: any = [];
  recipes: any = [];

  constructor(api: ApiService) {
    api.getDailyRecipe().subscribe(data => {
      this.recipe = data;
    });
    api.getRecipes().subscribe(data => {
      this.recipes = data;
    })
  }
}
