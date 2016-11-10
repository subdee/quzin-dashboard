import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'recipes-list',
  templateUrl: 'recipeslist.component.html',
  styleUrls: ['recipeslist.component.css'],
  providers: [ApiService]
})
export class RecipesListComponent {
  recipes: any = [];

  constructor(api: ApiService) {
    api.getRecipes().subscribe(data => {
      this.recipes = data;
    })
  }
}
