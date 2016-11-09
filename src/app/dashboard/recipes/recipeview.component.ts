import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'recipe-view',
  templateUrl: 'recipeview.component.html',
  styleUrls: ['recipeview.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  url: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.url = params['url'];
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
