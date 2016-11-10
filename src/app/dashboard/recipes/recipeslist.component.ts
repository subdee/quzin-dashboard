import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";
import * as moment from 'moment';

@Component({
  selector: 'recipes-list',
  templateUrl: 'recipeslist.component.html',
  styleUrls: ['recipeslist.component.css'],
  providers: [ApiService]
})
export class RecipesListComponent {
  recipes: any = [];

  constructor(api: ApiService) {
    moment.locale('el');
    api.getRecipes().subscribe(data => {
      this.recipes = data;
    })
  }
}
