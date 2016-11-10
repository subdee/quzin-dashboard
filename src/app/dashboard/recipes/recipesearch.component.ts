import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'recipe-search',
  templateUrl: 'recipesearch.component.html',
  providers: [ApiService]
})
export class RecipeSearchComponent implements OnInit, OnDestroy {
  api: ApiService;
  term: string;
  loading: boolean;
  recipes: any = [];
  private sub: any;

  constructor(private route: ActivatedRoute, api: ApiService) {
    this.api = api;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.term = params['term'];
      this.search();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search() {
    this.loading = true;
    this.api.searchRecipe(this.term).subscribe(data => {
      if (data.success) {
        this.recipes = data.results;
      }
      this.loading = false;
    });
  }
}
