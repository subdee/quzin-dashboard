import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShoppingListDetailComponent} from "./dashboard/shoppinglist/shoppinglist-detail.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RecipeViewComponent} from "./dashboard/recipes/recipeview.component";


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'shopping-list', component: ShoppingListDetailComponent},
      {path: 'recipe/:url', component: RecipeViewComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
