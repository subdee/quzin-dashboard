import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'recipe-view',
  templateUrl: 'recipeview.component.html',
  styleUrls: ['recipeview.component.css'],
  providers: [ApiService, MdSnackBar]
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  api: ApiService;
  snackBar: MdSnackBar;
  viewContainerRef: ViewContainerRef;
  title: string;
  url: string;
  private sub: any;

  constructor(private route: ActivatedRoute, api: ApiService, snackBar: MdSnackBar, viewContainerRef: ViewContainerRef, private translateService: TranslateService) {
    this.api = api;
    this.snackBar = snackBar;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.url = params['url'];
      this.title = params['title'];
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  saveRecipe() {
    let config = new MdSnackBarConfig(this.viewContainerRef);
    this.api.addNewRecipe(this.title, this.url).subscribe(data => {
      if (data.success) {
        this.translateService.get('snacks.recipe.saved').subscribe((res: string) => {
          this.snackBar.open(res, null, config);
        });
      } else {
        this.translateService.get('snacks.recipe.failed').subscribe((res: string) => {
          this.snackBar.open(res, null, config);
        });
      }
    });
  }
}
