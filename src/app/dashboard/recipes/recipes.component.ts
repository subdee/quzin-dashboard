import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css'],
  providers: [ApiService]
})
export class RecipesComponent {
  api: ApiService;
  router: Router;
  term: string = '';
  recipe: any = [];
  recipes: any = [];

  constructor(api: ApiService, router: Router) {
    this.api = api;
    this.router = router;
    this.loadDailyRecipe();
    this.loadRecipes();
    this.startPolling();
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

  searchRecipe() {
    this.router.navigate(['/recipe-search', this.term]);
  }

  startPolling() {
    Observable.interval(21600000).mergeMap(() => this.api.getDailyRecipe())
      .subscribe(data => {
        this.recipe = data;
      });
  }
}
