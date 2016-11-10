import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShoppingListDetailComponent} from "./dashboard/shoppinglist/shoppinglist-detail.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RecipeViewComponent} from "./dashboard/recipes/recipeview.component";
import {RecipesListComponent} from "./dashboard/recipes/recipeslist.component";
import {RecipeSearchComponent} from "./dashboard/recipes/recipesearch.component";
import {ShoppingListItemsComponent} from "./dashboard/shoppinglist/shoppinglist-items.component";


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'shopping-list', component: ShoppingListDetailComponent},
      {path: 'recipe/:title/:url', component: RecipeViewComponent},
      {path: 'recipes', component: RecipesListComponent},
      {path: 'recipe-search/:term', component: RecipeSearchComponent},
      {path: 'items', component: ShoppingListItemsComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
