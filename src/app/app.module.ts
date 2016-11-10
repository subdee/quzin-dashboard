import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {TranslateModule, TranslateStaticLoader, TranslateLoader, MissingTranslationHandler} from "ng2-translate";

import {AppComponent} from './app.component';
import {WeatherComponent} from "./dashboard/weather/weather.component";
import {SkyconsComponent} from "./dashboard/weather/skycons.component";
import {SeasonalsComponent} from "./dashboard/seasonals/seasonals.component";
import {ShoppingListComponent} from "./dashboard/shoppinglist/shoppinglist.component";
import {RecipesComponent} from "./dashboard/recipes/recipes.component";
import {QuzinMissingTranslationHandler} from "./handlers/missing.translations.handler";
import {AppRoutingModule} from "./app-routing.module";
import {ShoppingListDetailComponent} from "./dashboard/shoppinglist/shoppinglist-detail.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {RecipeViewComponent} from "./dashboard/recipes/recipeview.component";
import {SafePipe} from "./pipes/safe.pipe";
import {CacheService} from "ng2-cache/src/services/cache.service";
import {RecipesListComponent} from "./dashboard/recipes/recipeslist.component";
import {RecipeSearchComponent} from "./dashboard/recipes/recipesearch.component";
import {ShoppingListItemsComponent} from "./dashboard/shoppinglist/shoppinglist-items.component";
import {TimeAgoPipe} from "./pipes/timeago.pipe";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeatherComponent,
    SkyconsComponent,
    SeasonalsComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingListDetailComponent,
    ShoppingListItemsComponent,
    SpinnerComponent,
    RecipeViewComponent,
    RecipesListComponent,
    RecipeSearchComponent,
    SafePipe,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "el-GR"},
    {provide: MissingTranslationHandler, useClass: QuzinMissingTranslationHandler},
    CacheService
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
